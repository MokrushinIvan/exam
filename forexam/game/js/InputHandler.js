// js/InputHandler.js — ПОЛНОСТЬЮ ПЕРЕПИСАННАЯ И ИСПРАВЛЕННАЯ ВЕРСИЯ
export default class InputHandler {
    constructor(game) {
        this.game = game;

        // Состояние клавиш (true — зажата, false — отпущена)
        this.keys = {
            left: false,
            right: false,
            jump: false,
            level1: false,
            level2: false,
            level3: false,
            enter: false,   // Enter
            restart: false  // R
        };

        // === ОБРАБОТКА НАЖАТИЙ ===
        window.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();

            switch (key) {
                case 'a':
                case 'arrowleft':
                    this.keys.left = true;
                    break;

                case 'd':
                case 'arrowright':
                    this.keys.right = true;
                    break;

                case ' ':
                case 'w':
                case 'arrowup':
                    this.keys.jump = true;
                    e.preventDefault(); // чтобы страница не скроллилась
                    break;

                case '1':
                    this.keys.level1 = true;
                    break;

                case '2':
                    this.keys.level2 = true;
                    break;

                case '3':
                    this.keys.level3 = true;
                    break;

                case 'enter':
                    this.keys.enter = true;
                    e.preventDefault();
                    break;

                case 'r':
                    this.keys.restart = true;
                    break;
            }
        });

        // === ОБРАБОТКА ОТПУСКАНИЙ ===
        window.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();

            switch (key) {
                case 'a':
                case 'arrowleft':
                    this.keys.left = false;
                    break;

                case 'd':
                case 'arrowright':
                    this.keys.right = false;
                    break;

                case ' ':
                case 'w':
                case 'arrowup':
                    this.keys.jump = false;
                    break;

                case '1':
                    this.keys.level1 = false;
                    break;

                case '2':
                    this.keys.level2 = false;
                    break;

                case '3':
                    this.keys.level3 = false;
                    break;

                case 'enter':
                    this.keys.enter = false;
                    break;

                case 'r':
                    this.keys.restart = false;
                    break;
            }
        });
    }

    // Вызывается каждый кадр из Game.update()
    update() {
        const state = this.game.gameState;
        const player = this.game.player;

        // === РЕСТАРТ РАБОТАЕТ В ЛЮБОМ СОСТОЯНИИ ===
        if (this.keys.restart) {
            this.game.restart();
            this.keys.restart = false; // чтобы не срабатывало многократно
            return;
        }

        // === МЕНЮ И ОВЕРЛЕИ (не playing) ===
        if (state !== 'playing') {
            if (this.keys.level1) {
                this.game.currentLevel = 1;
                this.game.updateUI();
                this.keys.level1 = false;
            } else if (this.keys.level2) {
                this.game.currentLevel = 2;
                this.game.updateUI();
                this.keys.level2 = false;
            } else if (this.keys.level3) {
                this.game.currentLevel = 3;
                this.game.updateUI();
                this.keys.level3 = false;
            }

            if (this.keys.enter) {
                if (state === 'menu') {
                    this.game.startGame();
                } else if (state === 'levelComplete') {
                    this.game.startNextLevel();
                } else if (state === 'gameOver') {
                    this.game.restart(); // возврат в меню
                }
                this.keys.enter = false;
            }

            return; // в меню движение не нужно
        }

        // === ИГРОВОЙ ПРОЦЕСС (playing) ===
        if (!player) return; // на всякий случай

        // Движение влево/вправо
        if (this.keys.left) {
            player.moveLeft();
        } else if (this.keys.right) {
            player.moveRight();
        } else {
            player.stop();
        }

        // Прыжок — только один раз при нажатии и если на земле
        if (this.keys.jump && player.onGround) {
            player.jump();
            this.keys.jump = false; // предотвращаем автоповтор
        }
    }
}