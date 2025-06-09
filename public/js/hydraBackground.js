// create a new hydra-synth instance
var hydra = new Hydra({
    canvas: document.getElementById("myCanvas2"),
    detectAudio: false
})

bg01()

function bg02(){
    osc( 215, 0.1, 2 )
.modulate(
  osc( 2, -0.3, 100 )
  .rotate(15)
)
.mult(
  osc( 215, -0.1, 2)
  .pixelate( 50, 50 )
)
.color( 0.9, 0.0, 0.9 )
.modulate(
  osc( 6, -0.1 )
  .rotate( 9 )
)
.add(
  osc( 10, -0.9, 900 )
  .color(1,0,1)
)
.mult(
  shape(900, 0.2, 1)
  .luma()
  .repeatX(2)
  .repeatY(2)
  .colorama(10)
)
.modulate(
  osc( 9, -0.3, 900 )
  .rotate( 6 )
)
.add(
  osc(4, 1, 90)
  .color(0.2,0,1)
)
.scale(1, () => window.innerHeight / window.innerWidth)
.out()


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
function bg03(){
solid(0.2,0.6,0.9).layer(osc(31.4,0).thresh(0.7).luma().modulate(osc(4,1).rotate(1),0.05).color(0,0,0)).layer(osc(31.4,0).thresh(0.7).luma().modulate(osc(4,1).rotate(1),0.1)).out()
}

