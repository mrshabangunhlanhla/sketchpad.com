class Pen {
	constructor(color="#000000", size="5") {
		this.color = color;
		this.size = size;

	}
	
	draw(ctx, path) {
		const {points, color, size} = path;
		
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = size;
		ctx.moveTo(...points[0]);
		for(let i = 1; i<points.length; i++) {
			ctx.lineTo(...points[i]);
				
			
		}
		
		ctx.lineCap = "round";
		ctx.linejoin = "round";
		ctx.restore()
		ctx.stroke();
		
	
	}
	drawPaths(ctx, paths) {
		
			
		paths.forEach( path => {
			this.draw(ctx, path);
		})
	
		
	}
}

