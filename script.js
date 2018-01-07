const CANVAS_ID = "myCanvas";
const CANVAS_W = 500;
const CANVAS_H = 500;
const NB_W = 50;
const NB_H = 50;
const COLOR_ALIVE = "#000";
const COLOR_DEAD = "#FFF";
const REFRESH_INTERVAL = 300;

var grid;

function init() {
	initCanvas(CANVAS_ID);
	window.setInterval(refreshCanvas, REFRESH_INTERVAL);
}

function initCanvas(id) {
	var container = "body";
	var canvas = createCanvas(id, CANVAS_W, CANVAS_H);
	var body = document.getElementsByTagName(container)[0];
	generateGrid(NB_W, NB_H);

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
	grid = [];
	for (var i = 0; i < height; i++) {
		grid[i] = [];
		for (var j = 0; j < width; j++) {
			var cell;
			if (Math.random() < 0.5) cell = COLOR_DEAD;
			else cell = COLOR_ALIVE;
			grid[i].push(cell);
		}
		grid.push(grid[i]);
	}

	return grid;
}

function refreshCanvas() {
	refreshGrid();
	drawTiles(document.getElementById(CANVAS_ID), grid);
}

function neighbors(line, column) {
	var res = 0;

	for (var i = line - 1; i <= line + 1; i++) {
		for (var j = column - 1; j <= column +1; j++) {
			if (i != line || j != column) {
				if (grid[i] != undefined && grid[i][j] != undefined && grid[i][j] == COLOR_ALIVE) {
					res++;
				}				
			}
		}
	}

	return res;
}

function neighborsGrid() {
	var ng = [];
	for (var i = 0; i < grid.length; i++) {
		var n = [];
		for (var j = 0; j < grid[i].length; j++) {
			n.push(neighbors(i, j));
		}
		ng.push(n);
	}

	return ng;
}

function born(i, j) {
	grid[i][j] = COLOR_ALIVE;
}

function die(i, j) {
	grid[i][j] = COLOR_DEAD;
}

function refreshGrid() {
	var ng = neighborsGrid();
	console.log(ng);
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			refreshCell(i, j, ng[i][j]);
		}
	}
}

function refreshCell(i, j, n) {
	if (n == 3) born(i, j);
	else if (n < 2 || n > 3) die(i, j);
}