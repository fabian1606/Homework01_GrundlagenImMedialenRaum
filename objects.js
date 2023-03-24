/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

class MyObject {
	constructor(_x, _y, size) {
		this.size = { min: 1, max: width / size };
		this.brightness = { min: 0, max: 100 };
		this.myX = _x;
		this.myY = _y;
		this.mySize = 3;
		this.myBrightness = 100;
		this.myColor = color(20, 100, 100);
	}

	display(mouseInCanvas) {
		fill(this.myColor);
		noStroke();
		ellipse(this.myX, this.myY, this.mySize, this.mySize);
		if (mouseInCanvas) {
			let distance = this.calcualteMouseDistance();
			this.mySize = parseInt(
				map(
					distance,
					dist(0, 0, width, height),
					0,
					this.size.min,
					this.size.max
				)
			);
			this.myBrightness = parseInt(
				map(
					distance,
					dist(0, 0, width, height),
					0,
					this.brightness.min,
					this.brightness.max
				)
			);
			// console.log(this.myBrightness);
		}
	}

	setColor(newColor) {
		this.myColor = color(
			hue(newColor),
			saturation(newColor),
			this.myBrightness
		);
	}

	calcualteMouseDistance() {
		let distance = dist(mouseX, mouseY, this.myX, this.myY);
		return distance;
	}
}
