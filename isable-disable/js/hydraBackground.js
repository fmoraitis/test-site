// create a new hydra-synth instance
var hydra = new Hydra({
    canvas: document.getElementById("myCanvas2"),
    detectAudio: false
})


    osc(10, 0.2, 10)
    .modulate(o0, 0.20)
    // .brightness(10).contrast(0.2).saturate(20)
    .diff(voronoi(3).shift(0.6))
    .diff(osc(2, 0.015, 1.1).rotate())
    // .brightness(2.2).contrast(0.2).saturate(0.9)
    .brightness(20).contrast(0.02).saturate(10)
    .scale(1, () => window.innerHeight / window.innerWidth)
    .out()



// create functions to use with buttons