const sketchpad = new SketchPad()

const frameRate = 50;
let lastTime = 0;
animate();
function animate(currentTime) {
	const deltaTime = currentTime - lastTime;
	if (deltaTime >= 1000 / frameRate) {
		
		sketchpad.update();
	}
	requestAnimationFrame(animate);
}
