// create a new hydra-synth instance
var hydra = new Hydra({
    canvas: document.getElementById("myCanvas2"),
    detectAudio: false
})


osc(1, 0.2, 10)
    .repeat(10, 10)
osc(10, 0.1, 0.8).rotate(0, 0.1).color(-0.5, 1)
    .modulate(o0, 0.2)
    // .brightness(10).contrast(0.2).saturate(20)


voronoi(2, 0.3, 0.2).shift(0.5)
    .modulatePixelate(voronoi(4, 0.2), 32, 2)

    .diff(voronoi(3).shift(0.6))
    .diff(osc(2, 0.15, 1.1).rotate())
    .brightness(2.3).contrast(0.2).saturate(0.9)

    .scale(1, () => window.innerHeight / window.innerWidth)
    .out()

    

// create functions to use with buttons