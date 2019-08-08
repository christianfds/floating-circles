let canvas;
let ctx;
let circles = [];
let time;
let is_sticked = false;
let is_movement_1 = false;


class Circle{
	constructor(ctx, radius, x1_ratio, x2_ratio, y1_ratio, y2_ratio, index) {
		this.ctx = ctx;
		this.radius = radius;

		this.x1_ratio = x1_ratio;
		this.x1 = window.innerWidth*this.x1_ratio;

		this.x2_ratio = x2_ratio;
		this.x2 = window.innerWidth*this.x2_ratio;

		this.y1_ratio = y1_ratio;
		this.y1 = window.innerHeight*this.y1_ratio;

		this.y2_ratio = y2_ratio;
		this.y2 = window.innerHeight*this.y2_ratio;

		this.actual_x = this.x1;
		this.actual_y = this.y1;
		this.index = index;
	}

	move(){
		if(time){
			let x_boundaries = (this.x2 - this.x1)/2;
			let y_boundaries = (this.y2 - this.y1)/2;
			let x_offset = (this.x1 + this.x2)/2;
			let y_offset = (this.y1 + this.y2)/2;

			let y_forca = 1;
			let y_movimento = Math.sin((time-this.index*14)/100)*y_boundaries;
			if(!is_movement_1)
				y_forca = Math.sin((Math.abs((circles.length) - this.index)/(circles.length))*Math.PI);
			else
				y_forca = (this.index/circles.length);

			let x_forca = Math.sin((time-this.index*10)/1000)*x_boundaries;
			let x_movimento = (this.index / circles.length);


			this.actual_y = y_forca * y_movimento + y_offset;
			// this.actual_y = (this.index/circles.length) * y_movimento + y_offset;
			
			if(is_sticked)
				this.actual_x = x_movimento * x_forca + x_offset;
			else
				this.actual_x = x_forca + x_offset;

		}
	}

	render(){
		this.ctx.beginPath();
		this.ctx.arc(
			this.actual_x, 
			this.actual_y, 
			this.radius, 
			0, 2*Math.PI);
		ctx.fillStyle = "rgba("+255+","+(255 - (this.index/circles.length)*255)+","+(0)+",1)";
		ctx.fill();
		this.ctx.closePath();
	}
}

window.onload = () => {
	canvas = document.getElementById("my-canvas");
	ctx = canvas.getContext("2d");

	canvas.setAttribute("width", window.innerWidth);
	canvas.setAttribute("height", window.innerHeight);

	for (let i = 0; i < 200; i++) {
		circles.push(
			new Circle(
				ctx, 
				40, 
				0.25, 
				0.75, 
				2/6, 
				4/6, 
				circles.length)
			)
	}
	draw(ctx);
}

window.onresize = () => {
	canvas = document.getElementById("my-canvas");
	canvas.setAttribute("width", window.innerWidth);
	canvas.setAttribute("height", window.innerHeight);
}

window.addEventListener('keypress', (e)=>{
	if(e.code == "KeyP"){
		is_sticked = !is_sticked;
	}
	if(e.code == "KeyM"){
		is_movement_1 = !is_movement_1;
	}
})

function draw() {
	requestAnimationFrame(draw);
	let now = new Date().getTime(),
		dt = now - (time || now);
	time = now;

	ctx.beginPath();
	ctx.rect(0, 0,  window.innerWidth,  window.innerHeight);
	ctx.fillStyle = "#272822";
	ctx.fill();
	ctx.closePath();

	for(let i = circles.length - 1; i > 0; i--){
		circles[i].move();
		circles[i].render();
	}
 
	ctx.beginPath();
	ctx.fillStyle = "#F8F8F2";
	ctx.font = "15px Arial";
	ctx.fillText("P -", 10, 50);
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = "#A6E22E";
	ctx.font = "15px Arial";
	ctx.fillText("Sticked", 33, 50);
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = "#F8F8F2";
	ctx.font = "15px Arial";
	ctx.fillText("-", 87, 50);
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = is_sticked?"#66D9EF":"#F92672";
	ctx.fillText(is_sticked?"True":"False", 96, 50);
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = "#F8F8F2";
	ctx.font = "15px Arial";
	ctx.fillText("M -", 10, 70);
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = "#A6E22E";
	ctx.font = "15px Arial";
	ctx.fillText("2nd Move", 36, 70);
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = "#F8F8F2";
	ctx.font = "15px Arial";
	ctx.fillText("-", 108, 70);
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = is_movement_1?"#66D9EF":"#F92672";
	ctx.fillText(is_movement_1?"True":"False", 118, 70);
	ctx.closePath();

}