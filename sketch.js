// const { color } = require("echarts");

let objects = [];
let size = 150;
let ballcolor;
let currenthsb;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	colorMode(HSB, 360, 100, 100, 1);
	currenthsb = color(360, 100, 100);

	// create a grid of objects filling the canvas with the same gap between them on the x and y axis
	for (let x = 5; x < size - 5; x++) {
		for (let y = height / 90; y < size / 1.9; y++) {
			objects.push(
				new MyObject((width / size) * x, y * (height / size + 4), size)
			);
		}
	}

	// for (let x = 0; x < window.innerWidth / 40; x++) {
	// 	for (let y = 0; y < 60; y++) {
	// 		objects.push(
	// 			new MyObject((width / size) * x, y * (height / size), size)
	// 		);
	// 	}
	// }

	ballcolor = color(20, 80, 100);
}

function draw() {
	background(0);
	objects.forEach((obj) => {
		obj.display(mouseincanvas());
		// obj.setColor(ballcolor)
	});

	printtext();
}

function mouseincanvas() {
	return mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
}
function mousePressed() {
	for (let index = 0; index < objects.length; index++) {
		const obj = objects[index];
		// obj.setColor(color(map(index%size,0,size,0,360),map(parseInt(index/size),0,size,0,225),100));
		// console.log(map(index%size,0,size,0,360));

		//obj.setColor(color(int(map(index / size, 0, size, 0, 255)), 100, 100));

		//create a hsb gradient with the objects in the array
		obj.setColor(
			color(
				int(map(index, 0, objects.length, 0, 360)),
				int(map(obj.myY, 0, height, 10, 100)),
				100
			)
		);
		//let the saturation of the color change with the object position on the y axis

		// obj.setColor(
		// 	color(int(map(index, 0, objects.length, 0, 360)), int(map(obj.myY, 0, height, 0, 100)), 100)
	}
}
function mouseReleased() {
	for (let index = 0; index < objects.length; index++) {
		const obj = objects[index];
		currenthsb = color(
			int(map(mouseX, 0, width, 0, 360)),
			int(map(mouseY, 0, height, 10, 100)),
			100
		);
		obj.setColor(currenthsb);
	}
}

function printtext() {
	let printedcolor = currenthsb.toString();
	printedcolor = printedcolor.replace("rgba(", "");
	printedcolor = printedcolor.replace(",1)", "");
	printedcolor = printedcolor.split(",");
	console.log(printedcolor);

	textSize(20);
	text("click to change color", 50, objects[1].myY - 40);
	text("RGB: " + printedcolor, 50, objects[objects.length - 1].myY + 40);
	text(
		"HEX: " + rgbToHex(printedcolor[0], printedcolor[1], printedcolor[2]),
		250,
		objects[objects.length - 1].myY + 40
	);
	text(
		"HSL: " + rgbToHsl(printedcolor[0], printedcolor[1], printedcolor[2]),
		430,
		objects[objects.length - 1].myY + 40
	);
}

function rgbToHex(r, g, b) {
	return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

function rgbToHsl(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;
	const l = Math.max(r, g, b);
	const s = l - Math.min(r, g, b);
	const h = s
		? l === r
			? (g - b) / s
			: l === g
			? 2 + (b - r) / s
			: 4 + (r - g) / s
		: 0;
	return [
		int(60 * h < 0 ? 60 * h + 360 : 60 * h),
		int(
			100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
		),
		int((100 * (2 * l - s)) / 2),
	];
}
