function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.position(0, 0)
    //myCanvas.class('backgroundsketch');
    myCanvas.style('z-index', '-1')

}

function draw() {
    background(175)
  	ellipse(50, 50, 80, 80);
}
function mouseMoved() {
	//ellipse(mouseX, mouseY, 80, 80);
}
function mouseDragged(){ellipse(mouseX, mouseY, 80, 80);}