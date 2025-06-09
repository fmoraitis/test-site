window.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('overlayCanvas');
  const gl = canvas.getContext('webgl');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  }
  resize();
  window.addEventListener('resize', resize);

  // Vertex shader
  const vert = `
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0, 1);
    }
  `;

  // Fragment shader with simplex noise for perimeter and glitch effect
  const frag = `
    precision mediump float;
    varying vec2 vUv;
    uniform vec2 u_mouse;
    uniform vec2 u_res;
    uniform float u_active;
    uniform float u_time;

    // Simplex noise (Ashima Arts)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ; m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    // Swirl function
    vec2 swirl(vec2 uv, vec2 center, float strength, float radius) {
      vec2 offset = uv - center;
      float dist = length(offset);
      if(dist < radius) {
        float percent = (radius - dist) / radius;
        float theta = percent * percent * strength;
        float s = sin(theta);
        float c = cos(theta);
        offset = vec2(
          offset.x * c - offset.y * s,
          offset.x * s + offset.y * c
        );
      }
      return center + offset;
    }

    void main() {
      if(u_active < 0.5) discard;
      vec2 uv = vUv * u_res;
      float d = distance(uv, u_mouse);

      // Oscillating, noisy, animated perimeter
      float baseRadius = 100.0 + sin(u_time * 1.6) * 25.0; // oscillates between 60 and 100
      float angle = atan(uv.y - u_mouse.y, uv.x - u_mouse.x);
      float noise = snoise(vec2(angle * 2.0, u_time * 0.1 + angle * 0.2));
      float wavyRadius = baseRadius + noise * 32.0; // 32 = noise amplitude

      float edge = smoothstep(wavyRadius + 4.0, wavyRadius, d);

      // Swirl only inside the noisy shape
      vec2 swirled = swirl(uv, u_mouse, 2.5, wavyRadius);

      // --- Glitch effect ---
      float glitch = step(0.5, fract(sin(dot(swirled.xy + u_time * 10.0, vec2(12.9898,78.233))) * 43758.5453));
      float offset = glitch * 8.0;
      vec2 glitchCoord = swirled + vec2(offset, 0.0);
      float noiseVal = fract(sin(dot(swirled.xy + u_time * 20.0, vec2(127.1,311.7))) * 43758.5453);

      float r = smoothstep(0.0, 1.0, fract(glitchCoord.x * 0.05 + u_time));
      float g = smoothstep(0.0, 1.0, fract(glitchCoord.y * 0.05 - u_time));
      float b = noiseVal;
      vec3 color = vec3(r, g, b);

      gl_FragColor = vec4(color, 0.002 * edge); // even more transparent overlay
      if(gl_FragColor.a < 0.001) discard;
    }
  `;

  function compile(type, source) {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    return s;
  }
  const vs = compile(gl.VERTEX_SHADER, vert);
  const fs = compile(gl.FRAGMENT_SHADER, frag);

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const pos = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pos);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, -1, 1, 1, 1
  ]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'position');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u_mouse = gl.getUniformLocation(prog, 'u_mouse');
  const u_res = gl.getUniformLocation(prog, 'u_res');
  const u_active = gl.getUniformLocation(prog, 'u_active');
  const u_time = gl.getUniformLocation(prog, 'u_time');
  let mouse = [window.innerWidth/2, window.innerHeight/2];
  let active = 1;
  let start = performance.now();

  window.addEventListener('mousemove', e => {
    mouse = [e.clientX, canvas.height - e.clientY];
  });

  function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(u_mouse, mouse[0], mouse[1]);
    gl.uniform2f(u_res, canvas.width, canvas.height);
    gl.uniform1f(u_active, active);
    gl.uniform1f(u_time, (performance.now() - start) * 0.001);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(draw);
  }
  draw();
});