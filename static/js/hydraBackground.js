// create a new hydra-synth instance
var hydra = new Hydra({
    canvas: document.getElementById("myCanvas2"),
    detectAudio: false
})
osc(10, 0.1, 0.8).rotate(0, 0.1).kaleid().color(-1, 1)
    .scale(1, () => window.innerHeight / window.innerWidth)
    .out()

osc(1, 0.2, 10)
    .repeat(10, 10)
    osc(10, 0.1, 0.8).rotate(0, 0.1).color(-0.5, 1)
    .modulate(o0, 0.2)
    .brightness(10).contrast(0.2).saturate(20)
    .scale(1, () => window.innerHeight / window.innerWidth)
    .out(o0)
// create functions to use with buttons