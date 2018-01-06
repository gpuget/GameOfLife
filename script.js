var CANVAS_ID = "myCanevas";
var CANVAS_W = 50;
var CANVAS_H = 50;
var TILE_W = 25;
var TILE_H = 25;
var COLOR_FULL = "#000";
var COLOR_EMPTY = "#FFF";

function init() {
	initCanvas(CANVAS_ID);
}

function initCanvas(id) {
	var container = "body";
	var canvas = createCanvas(id, CANVAS_W, CANVAS_H);
	var body = document.getElementsByTagName(container)[0];
	body.appendChild(canvas);
	randomFill(canvas, TILE_W, TILE_H);
}

function createCanvas (id, width, height) {
	var canvas = document.createElement("canvas");
	canvas.id = id;
	canvas.width = width;
	canvas.height = height;
	return canvas;
}

function randomFill(canvas, tileWidth, tileHeight) {
	var w = canvas.width / tileWidth;
	var h = canvas.height / tileHeight;
	var ctx = canvas.getContext("2d");

	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			ctx.fillStyle = chooseColor();
			ctx.fillRect(i*tileWidth, j*tileHeight, tileWidth, tileHeight);
		}
	}
}

function chooseColor() {
	var r = Math.random();

	if (r < 0.5) {
		return COLOR_FULL;
	} else {
		return COLOR_EMPTY;
	}
}