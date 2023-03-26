const objects = [];
const size = 150;
let ballColor;
let currentHSB;
let rgbInput, hexInput, hslInput;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	colorMode(HSB, 360, 100, 100, 1);
	currentHSB = color(360, 100, 100);

	for (let x = 5; x < size - 5; x++) {
		for (let y = height / 90; y < size / 1.9; y++) {
			objects.push(
				new MyObject((width / size) * x, y * (height / size + 4), size)
			);
		}
	}

	ballColor = color(20, 80, 100);

	// create input fields
	rgbInput = createInput();
	rgbInput.position(50, objects[objects.length - 1].myY + 50);

	hexInput = createInput();
	hexInput.position(250, objects[objects.length - 1].myY + 50);

	hslInput = createInput();
	hslInput.position(450, objects[objects.length - 1].myY + 50);

	// set input fields to readonly
	rgbInput.attribute("readonly", "");
	hexInput.attribute("readonly", "");
	hslInput.attribute("readonly", "");
}

function draw() {
	background(0);
	objects.forEach((object) => {
		object.display(mouseInCanvas());
	});

	printText();
}

function mouseInCanvas() {
	return mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
}

function mousePressed() {
	for (let i = 0; i < objects.length; i++) {
		const object = objects[i];
		object.setColor(
			color(
				int(map(i, 0, objects.length, 0, 360)),
				int(map(object.myY, 0, height, 10, 100)),
				100
			)
		);
	}
}

function mouseReleased() {
	for (let i = 0; i < objects.length; i++) {
		const object = objects[i];
		currentHSB = color(
			int(map(mouseX, 0, width, 0, 360)),
			int(map(mouseY, 0, height, 10, 100)),
			100
		);
		object.setColor(currentHSB);
	}
}

function printText() {
	const printedColor = currentHSB
		.toString()
		.replace("rgba(", "")
		.replace(",1)", "")
		.split(",");

	textSize(20);
	text("click to change color", 50, objects[1].myY - 40);

	// set text of input fields
	rgbInput.value(printedColor.join(", "));
	hexInput.value(rgbToHex(printedColor[0], printedColor[1], printedColor[2]));
	hslInput.value(
		rgbToHsl(printedColor[0], printedColor[1], printedColor[2]).join(", ")
	);

	text("RGB:", 50, objects[objects.length - 1].myY + 40);
	text("HEX:", 250, objects[objects.length - 1].myY + 40);
	text("HSL:", 450, objects[objects.length - 1].myY + 40);
}

// Convert RGB color values to a hexadecimal color code.
const rgbToHex = (r, g, b) => {
	return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
};

// Convert RGB color values to HSL color values.
const rgbToHsl = (r, g, b) => {
	// Convert RGB values from 0-255 to 0-1.
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;

	if (max === min) {
		// Grayscale.
		return [0, 0, Math.round(l * 100)];
	} else {
		const d = max - min;
		const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		let h;
		switch (max) {
			case r:
				h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
				break;
			case g:
				h = ((b - r) / d + 2) / 6;
				break;
			case b:
				h = ((r - g) / d + 4) / 6;
				break;
		}
		return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
	}
};
