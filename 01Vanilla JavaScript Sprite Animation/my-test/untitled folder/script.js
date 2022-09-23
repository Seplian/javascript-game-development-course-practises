let name = 'bite';
const stateInput = document.querySelector('.state');
stateInput.addEventListener('input', () => {
	 name = stateInput.value;
});

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const spriteWidth = 575;
const spriteHeight = 523;
let sX = 0;
let frame = 0;
let frameDuration = 6;

let animateCurrentArray = [];
let animateArray = [];

animateArray = [
{
	name: "idle",
	keyframeNumber: 7
},
{
	name: "jump",
	keyframeNumber: 7
},
{
	name: "fall",
	keyframeNumber: 7
},
{
	name: "run",
	keyframeNumber: 9
},
{
	name: "dizzy",
	keyframeNumber: 11
},
{
	name: "sit",
	keyframeNumber: 5
},
{
	name: "roll",
	keyframeNumber: 7
},
{
	name: "bite",
	keyframeNumber: 7
},
{
	name: "ko",
	keyframeNumber: 12
},
{
	name: "getHit",
	keyframeNumber: 4
}
];


const image = new Image();
image.src = 'images/shadow_dog.png';

image.addEventListener('load', animate);


animateArray.forEach((state, index, array) => {
	let loc = [];

	for (let i = 0; i < state.keyframeNumber; i++) {
		loc.push({ x: i * spriteWidth, y: index * spriteHeight });
	}

	animateCurrentArray[state.name] = loc;
})

function animate() {
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	ctx.drawImage(image, animateCurrentArray[name][sX].x, animateCurrentArray[name][0].y, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

	if(frame % frameDuration === 0) {
		if (sX < animateCurrentArray[name].length - 1) {
			sX++;
		} else {
			sX = 0;
		}
	}

	frame++;
	window.requestAnimationFrame(animate);
}



