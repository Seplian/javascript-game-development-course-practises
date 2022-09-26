
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

const backgroundImage1 = new Image();
backgroundImage1.src = 'images/layer-1.png';
const backgroundImage2 = new Image();
backgroundImage2.src = 'images/layer-2.png';
const backgroundImage3 = new Image();
backgroundImage3.src = 'images/layer-3.png';
const backgroundImage4 = new Image();
backgroundImage4.src = 'images/layer-4.png';
const backgroundImage5 = new Image();
backgroundImage5.src = 'images/layer-5.png';

// let x = 0;
// let x2 = 2400;
let gameSpeed = 15;

const gameSpeedSetter = document.querySelector('#setGameSpeed');
gameSpeedSetter.value = gameSpeed;
const showGameSpeed = document.querySelector('.showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
gameSpeedSetter.addEventListener('change', (e) => {
	gameSpeed = e.target.value;
	showGameSpeed.innerHTML = e.target.value;
});

class Layer {

	constructor(image, speedModifier) {
		this.image = image;
		this.speedModifier = speedModifier;
		this.x = 0;
		this.y = 0;
		this.width = 2400;
		this.height = 700;
	}

	draw () {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
	}

	update() {
		if (this.x < -this.width) {
			this.x = 0;
		}

		// When x < -2400, then x + width < 0. The left edge of the image is already to the left of the origin. If we directly jump to x = 0, there will be a jitter to the right, so reduce the value of x regardless of whether the boundary condition is satisfied

		// Remove the fractional part to make the jumps a little smoother when the boundary conditions are met
		this.x = Math.floor(this.x -gameSpeed * this.speedModifier);

		// this.x = gameFrame * gameSpeed * this.speedModifier % this.width;
	}
}

const layer1 = new Layer(backgroundImage1, 0.2);
const layer2 = new Layer(backgroundImage2, 0.4);
const layer3 = new Layer(backgroundImage3, 0.6);
const layer4 = new Layer(backgroundImage4, 0.8);
const layer5 = new Layer(backgroundImage5, 1.0);
const layerArray = [layer1, layer2, layer3, layer4, layer5];

function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	layerArray.forEach((layer) => {
		layer.update();
		layer.draw();
	})

	requestAnimationFrame(animate);
}

gameSpeedSetter.addEventListener('input', () => {
	gameSpeed = e.currentTarget.value;
});

window.addEventListener('load', animate);


// ------------------------- two variables version ------------------------
// ------------------------- x-- in any condition -------------------------

	// ctx.drawImage(backgroundImage4, x, 0);
	// ctx.drawImage(backgroundImage4, x2, 0);

	// if (x < -2400) {
	// 	x = 2400 + x2 - gameSpeed;
	// }
	// x -= gameSpeed;
	// if (x2 < -2400) {
	// 	x2 = 2400 +x - gameSpeed;
	// }
	// x2 -= gameSpeed;

	// -gameSpeed: two variables don't synchronous when one was resetting
	// +x(x2): if the width of image can't divide by gameSpeed, like 13  in our example, -gameSpeed can't fill the gape thoroughly.

// ------------------------- two variables version ------------------------
// ------------------------- x-- in the else expression -------------------

	// ctx.drawImage(backgroundImage4, x, 0);
	// ctx.drawImage(backgroundImage4, x2, 0);

	// if (x < -2400) {
	// 	x = 2400 - gameSpeed + x2;
	// } else {
	// 	x -= gameSpeed;
	// }

	// if (x2 < -2400) {
	// 	x2 = 2400 - gameSpeed + x;
	// } else {
	// 	x2 -= gameSpeed;
	// }

// -------------------------- single variable version----------------------
// ------------------------- x-- in the else expression -------------------

	// ctx.drawImage(backgroundImage4, x, 0);
	// ctx.drawImage(backgroundImage4, x+2400, 0);

	// if (x < -2400) {
	// 	x = 0;
	// } else {
	// 	x -= gameSpeed;
	// }






// ----------------------------Some test function--------------------------
// ------------------------- x-- in any condition -------------------------
// ------------------------- - testSpeed ----------------------------------
// ------------------------- - testSpeed + num[the other]------------------

let testSpeed = 15;
let num1 = 0;
let num2 = 2400;

for (let i = 0; i < 100000; i++) {
	if (Math.abs(num1 - num2) > 2400) {
		console.log('Nope!');
		console.log(`num1: ${num1}, num2: ${num2}, i: ${i}`);
		console.log(`num1[i-1]: ${num1+testSpeed}, num2[i-1]: ${num2+testSpeed}, i-1: ${i-1}`);
		break;
	}

	if (num1 < -2400) {
		num1 = 2400 - testSpeed + num2;
	} else {
		num1 -= testSpeed;
	}
	if (num2 < -2400) {
		num2 = 2400 - testSpeed + num1;
	} else {
		num2 -= testSpeed;
	}
}

// ----------------------------Some test function--------------------------
// ------------------------- x-- in the else expression -------------------
// ------------------------- - testSpeed ----------------------------------
// ------------------------- - testSpeed + num[the other]------------------

let num3 = 0;
let num4 = 2400;

for (let i = 0; i < 100000; i++) {
	if (Math.abs(num3 - num4) > 2400) {
		console.log('Nope! Nope!');
		console.log(`num3: ${num3}, num4: ${num4}, i: ${i}`);
		console.log(`num3[i-1]: ${num3+testSpeed}, num4[i-1]: ${num4+testSpeed}, i-1: ${i-1}`);
		break;
	}

	if (num3 < -2400) {
		num3 = 2400 - testSpeed + num4;
	}
	if (num4 < -2400) {
		num4 = 2400 - testSpeed + num3;
	}

	num3 -= gameSpeed;
	num4 -= gameSpeed;
}