var CANVAS_ID = "myCanvas";
var CANVAS_W = 50;
var CANVAS_H = 50;
var NB_W = 2;
var NB_H = 2;
var COLOR_FULL = "#000";
var COLOR_EMPTY = "#FFF";

function init() {
	initCanvas(CANVAS_ID);
}

function initCanvas(id) {
	var container = "body";
	var canvas = createCanvas(id, CANVAS_W, CANVAS_H);
	var body = document.getElementsByTagName(container)[0];
	var grid = generateGrid(NB_W, NB_H);

	body.appendChild(canvas);
	drawTiles(canvas, grid);
}

function createCanvas (id, width, height) {
	var canvas = document.createElement("canvas");
	canvas.id = id;
	canvas.width = width;
	canvas.height = height;
	return canvas;
}

function drawTiles(canvas, grid) {
	var tileWidth = canvas.width / grid[0].length;
	var tileHeight = canvas.height / grid.length;
	var ctx = canvas.getContext("2d");

	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			ctx.fillStyle = grid[i][j];
			ctx.fillRect(j*tileWidth, i*tileHeight, tileWidth, tileHeight);
		}
	}
}

function generateGrid(width, height) {
	var grid = new Array(height);
	for (var i = 0; i < grid.length; i++) {
		grid[i] = new Array(width);
		for (var j = 0; j < grid[i].length; j++) {
			grid[i][j] = chooseColor();
		}
	}

	return grid;
}

function chooseColor() {
	var r = Math.random();

	if (r < 0.5) return COLOR_EMPTY;
	else return COLOR_FULL;
}