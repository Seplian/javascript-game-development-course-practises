
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

let x = 0;
let x2 = 2400;
let gameSpeed = 13;

function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

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

// -------------------------- main code------------------------------------

	ctx.drawImage(backgroundImage4, x, 0);
	ctx.drawImage(backgroundImage4, x+2400, 0);

	if (x < -2400) {
		x = 0;
	} else {
		x -= gameSpeed;
	}

	requestAnimationFrame(animate);
}

animate();

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