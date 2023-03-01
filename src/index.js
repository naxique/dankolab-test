import { Application, Graphics, Sprite, Text } from 'pixi.js';
import { Button } from '@pixi/ui';

const app = new Application({
	view: document.getElementById("pixi-canvas"),
	resizeTo: window,
	autoDensity: true,
	backgroundColor: 0x6495ed
});

const resize = () => {
	app.resize();
	sprite.x = app.screen.width / 2;
	sprite.y = app.screen.height / 2;
	buttonView.x = (app.screen.width / 2) - (buttonView.width / 2);
	buttonView.y = app.screen.height - buttonView.height - 10;
	text.x = buttonView.width / 2;
	text.y = buttonView.height / 2;
}
window.onresize = () => resize();

const sprite = Sprite.from("./assets/img/flushed.png");
sprite.anchor.set(0.5);
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
let yVel = 0;
let isJumping = false;

const buttonView = new Graphics().beginFill(0xfafafa).drawRoundedRect(0, 0, 200, 50, 10);
buttonView.x = (app.screen.width / 2) - (buttonView.width / 2);
buttonView.y = app.screen.height - buttonView.height - 10;

const text = new Text('Jump', { fontSize: 40 });
text.anchor.set(0.5);
text.x = buttonView.width / 2;
text.y = buttonView.height / 2;
buttonView.addChild(text);

const button = new Button(buttonView);

const handleJump = () => {
	yVel = 15;
	isJumping = true;
	idle = false;
};

button.onPress.connect(handleJump);

let idle = false;
let idleTimer = 0;
app.ticker.add((delta) => {

	if (!isJumping) {
		yVel = 0;
		sprite.y = app.screen.height / 2;
	} else {
		yVel -= 1 * delta;
	}

	sprite.y -= yVel;
	if (sprite.y > app.screen.height / 2) isJumping = false;

	if (!idle && idleTimer <= 50) {
		idleTimer += 0.1 * delta;
	} else {
		idleTimer = 0;
		idle = true;
	}
	if (idle) sprite.rotation += 0.05 * delta;
});

app.stage.addChild(button.view);
app.stage.addChild(sprite);