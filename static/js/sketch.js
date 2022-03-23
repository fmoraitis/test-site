
// let x1off=0;
let x = [];
let y = [];
let fourier;
//let fourierY;
let time = 0;
let path = [];

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.position(0,windowHeight/2)
  //myCanvas.class('backgroundsketch');
  myCanvas.style('z-index', '-1')


  const skip = 4;
  for (let i = 0; i < xpos.length; i += skip) {
    x.push(xpos[i]*1.5); // just scale the points
    y.push(ypos[i]*1.5);// just scale the pointss
  }
  fourier = dft(x,y);
 // fourierY = dft(y);

 fourier.sort((a, b) => b.amp - a.amp);
 //fourier.sort((a, b) => b.phase - a.phase);
  //fourierY.sort((a, b) => b.amp - a.amp);
}

function epiCycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * cos(freq * time + phase +rotation);
    y += radius * sin(freq * time + phase +rotation);

    stroke(255, 100);
    noFill();
    push()
    translate(0,  0)
    stroke(255,0,0,100);
    ellipse(prevx, prevy, radius * 2);
    stroke(255);
    stroke(255,0,0,50);
    line(prevx, prevy, x, y);
   pop()
  }
  return createVector(x, y);
}

function windowResized(){
  resizeCanvas( windowWidth, windowHeight)
}
function draw() {
 // background(255);
  
  fill(255,80);
  noStroke();
  rect(0,0, windowWidth, windowHeight);
 
frameRate(20);
let v = epiCycles(width / 2,height/2 , 0, fourier);
 
//let vy = epiCycles(100, height / 2 + 100, HALF_PI, fourierY);
  // = createVector(vx.x, vx.y);
  path.unshift(v);// adds to the begining of the array
  stroke(255,0,0,50);
  line(v.x, v.y, v.x, v.y);
  //line(vy.x, vy.y, v.x, v.y);

  beginShape();
  noFill();
  stroke(255,0,0);
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
    // x1off+=0.01;
  }
  endShape();

  const dt = TWO_PI / fourier.length;
  time += dt;

  if (time > TWO_PI) {
    time = 0;
    path = [];
  }

  // if (wave.length > 250) {
  //   wave.pop();
  // }
}
