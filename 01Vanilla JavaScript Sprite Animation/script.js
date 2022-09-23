
let playerState = 'bite' ;
const stateInput = document.querySelector('.animations');
stateInput.addEventListener('change', () => {
	playerState = stateInput.value;
});

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// set the original frame size
const spriteWidth = 575;
const spriteHeight = 523;
// A global JavaScript variable is written in UPPERCASE if it is immutable.

// control the frames
let gameFrame = 0;
let staggerFrames = 5; // every frames to change the keyframe

// construct an object array to store the all the loc of every line of the keyframe
const sprtieAnimations = [];
let animationStates;

fetch('animationStates.json')
	.then((response) => response.json())
	.then((data) => {
		animationStates = data;
	})
	.then(() => {
		animationStates.forEach((state, index) => {
			let framesLoc = {
				loc: [],
			}

			for (i = 0; i < state.frames; i++) {
				let positionX = i * spriteWidth;
				let positionY = index * spriteHeight;
				framesLoc.loc.push({x: positionX, y: positionY});
			};

			sprtieAnimations[state.name] = framesLoc;
			// "string keyed" indexes are not indexes at all, but properties. array2["a"] is the same as saying array2.a. Remember that you can set properties on any kind of variable in javascript; on the other hand,  "array index", it actually means that the property key is numeric.
		});
	})
	.then(() => animate());


// animationStates.forEach((state, index) => {
// 	let framesLoc = {
// 		loc: [],
// 	}

// 	for (i = 0; i < state.frames; i++) {
// 		let positionX = i * spriteWidth;
// 		let positionY = index * spriteHeight;
// 		framesLoc.loc.push({x: positionX, y: positionY});
// 	};

// 	sprtieAnimations[state.name] = framesLoc;
// });

// console.log(sprtieAnimations);

// import the animation keyframe image
const playerImage = new Image();
playerImage.src = 'images/shadow_dog.png';

// define the animation function
function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	let position = Math.floor(gameFrame / staggerFrames) % sprtieAnimations[playerState].loc.length;

	// set frame coordinate on the image
	let frameX = spriteWidth * position;
	let frameY = sprtieAnimations[playerState].loc[position].y;

	ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

	gameFrame++;
	window.requestAnimationFrame(animate);
}
























// const animationStates = [
// {
// 	name: "idle",
// 	frames: 7
// },
// {
// 	name: "jump",
// 	frames: 7
// },
// {
// 	name: "fall",
// 	frames: 7
// },
// {
// 	name: "run",
// 	frames: 9
// },
// {
// 	name: "dizzy",
// 	frames: 11
// },
// {
// 	name: "sit",
// 	frames: 5
// },
// {
// 	name: "roll",
// 	frames: 7
// },
// {
// 	name: "bite",
// 	frames: 7
// },
// {
// 	name: "ko",
// 	frames: 12
// },
// {
// 	name: "getHit",
// 	frames: 4
// }
// ];
