// create a new hydra-synth instance
var hydra = new Hydra({
    canvas: document.getElementById("myCanvas2"),
    detectAudio: false
})

bg01()

function bg02(){
    osc(20, 0.01, 1.1)
	.kaleid(5)
	.color(2.83,0.91,0.39)
	.rotate(0, 0.1)
	.modulate(o0, () => mouse.x *mouse.y* 0.003)
	.scale(1.01)
  	
   
    .scale(1, () => window.innerHeight / window.innerWidth)

    .out(o0)

}
function bg01(){
    osc(10, 0.2, 10)
    .modulate(o0, 0.20)
    // .brightness(10).contrast(0.2).saturate(20)
    .diff(voronoi(3).shift(0.6))
    .diff(osc(2, 0.015, 1.1).rotate())
    // .brightness(2.2).contrast(0.2).saturate(0.9)
    .brightness(20).contrast(0.02).saturate(10)
    .modulate(o0, () => mouse.x * 0.0003)
    .scale(1, () => window.innerHeight / window.innerWidth)
    .out(o0)
}

// create functions to use with buttons