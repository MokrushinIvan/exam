// js/main.js
import Game from './Game.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const levelElement = document.getElementById('level');

let game;

function initGame() {
    game = new Game(canvas, ctx, scoreElement, livesElement, levelElement);
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    game.update();
    game.render();
    requestAnimationFrame(gameLoop);
}

initGame();