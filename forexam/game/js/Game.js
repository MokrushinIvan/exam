// js/Game.js — ФИНАЛЬНАЯ ВЕРСИЯ СО ВСЕМИ ИСПРАВЛЕНИЯМИ
import Player from './Player.js';
import Platform from './Platform.js';
import Coin from './Coin.js';
import Enemy from './Enemy.js';
import InputHandler from './InputHandler.js';
import { collisions as utilsCollisions } from './utils.js';

export default class Game {
    constructor(canvas, ctx, scoreElement, livesElement, levelElement) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.scoreElement = scoreElement;
        this.livesElement = livesElement;
        this.levelElement = levelElement;

        this.width = canvas.width;
        this.height = canvas.height;

        this.gravity = 0.4;
        this.score = 0;
        this.lives = 3;
        this.currentLevel = 1;
        this.cameraX = 0;
        this.cameraY = 0;
        this.ready = false;
        this.gameState = 'menu';

        this.platforms = [];
        this.coins = [];
        this.enemies = [];
        this.player = null;
        this.worldWidth = 3000;

        this.input = new InputHandler(this);

        this.updateUI();
    }

    updateUI() {
        this.scoreElement.textContent = this.score;
        this.livesElement.textContent = this.lives;
        this.levelElement.textContent = this.currentLevel;
    }

    collisions(a, b) {
        return utilsCollisions(a, b);
    }

    getLevelData(level) {
        if (level === 1) {
            return {
                worldWidth: 3000,
                platforms: [[150,450,300,20],[500,410,250,20],[800,370,200,20],[1100,330,180,20],[1400,290,220,20],[1700,350,180,20],[300,310,150,20],[600,270,180,20],[900,230,150,20],[1200,210,200,20],[1550,250,180,20]],
                coins: [[280,400],[620,360],[880,320],[1180,280],[1480,240],[1700,300],[380,250],[680,210],[980,170],[1280,150]],
                enemies: [[400,450-35,'walk'],[900,370-35,'walk'],[1400,290-35,'walk'],[600,250,'fly'],[1100,180,'fly']]
            };
        } else if (level === 2) {
            return {
                worldWidth: 3800,
                platforms: [[200,480,350,20],[600,430,300,20],[1000,380,250,20],[1400,340,200,20],[1800,300,300,20],[2200,360,250,20],[2600,410,200,20],[3000,450,300,20],[400,350,200,20],[800,300,180,20],[1200,250,220,20],[1600,400,180,20],[2000,220,150,20],[2400,280,200,20],[2800,320,180,20]],
                coins: [[300,430],[700,380],[1100,330],[1500,290],[1900,250],[2300,310],[2700,360],[3100,400],[500,300],[900,250],[1300,200],[1700,350],[2100,170],[2500,230],[2900,270]],
                enemies: [[650,430-35,'walk'],[1100,380-35,'walk'],[1600,340-35,'walk'],[2100,300-35,'walk'],[2800,450-35,'walk'],[900,250,'fly'],[1400,200,'fly'],[1900,350,'fly'],[2500,230,'fly']]
            };
        } else if (level === 3) {
            return {
                worldWidth: 4500,
                platforms: [[250,500,400,20],[700,450,300,20],[1200,400,350,20],[1700,350,300,20],[2200,300,250,20],[2700,380,300,20],[3200,430,250,20],[3700,480,400,20],[500,350,200,20],[1000,300,180,20],[1500,250,220,20],[2000,400,200,20],[2500,200,180,20],[3000,280,250,20],[3500,340,200,20],[4000,390,300,20]],
                coins: [[350,450],[800,400],[1300,350],[1800,300],[2300,250],[2800,330],[3300,380],[3800,430],[4200,440],[600,300],[1100,250],[1600,200],[2100,350],[2600,150],[3100,230],[3600,290],[4100,340]],
                enemies: [[750,450-35,'walk'],[1300,400-35,'walk'],[1900,350-35,'walk'],[2400,300-35,'walk'],[3000,380-35,'walk'],[3600,430-35,'walk'],[1000,250,'fly'],[1600,150,'fly'],[2200,350,'fly'],[2800,200,'fly'],[3400,290,'fly']]
            };
        }
        return null;
    }

    buildLevel(level) {
        const data = this.getLevelData(level);
        if (!data) return false;

        this.worldWidth = data.worldWidth;
        this.platforms = [new Platform(this, 0, 580, this.worldWidth, 80)];

        data.platforms.forEach(p => this.platforms.push(new Platform(this, ...p)));
        this.coins = data.coins.map(([x, y]) => new Coin(this, x, y - 30));
        this.enemies = data.enemies.map(([x, y, type]) => new Enemy(this, x, y, type));

        return true;
    }

    async loadAssets() {
        this.player = new Player(this);
        await this.player.loadAnimations();
        await Promise.all(this.enemies.map(e => e.loadAnimations()));
    }

    async startGame() {
        if (!this.buildLevel(this.currentLevel)) return;
        await this.loadAssets();
        this.resetPlayer();
        this.gameState = 'playing';
        this.ready = true;
        this.updateUI();
    }

    startNextLevel() {
        this.currentLevel++;
        if (this.currentLevel > 3) {
            alert(`ПОБЕДА! Все уровни пройдены!\nФинальный счёт: ${this.score} ★`);
            this.restart();
            return;
        }
        this.startGame();
    }

    resetPlayer() {
        this.player.x = 100;
        this.player.y = 580 - this.player.height;  // Ровно на земле
        this.player.velocityX = 0;
        this.player.velocityY = 0;
        this.player.onGround = true;
        this.player.visible = true;
    }

    restart() {
        this.currentLevel = 1;
        this.score = 0;
        this.lives = 3;
        this.gameState = 'menu';
        this.cameraX = 0;
        this.cameraY = 0;
        this.platforms = [];
        this.coins = [];
        this.enemies = [];
        this.player = null;
        this.ready = false;
        this.updateUI();
    }

    update() {
        this.input.update();

        if (this.gameState !== 'playing' || !this.ready) return;

        this.player.update();

        // Горизонтальные коллизии
        this.player.x += this.player.velocityX;
        for (const p of this.platforms) {
            const box = p.getCollisionBox();
            if (this.collisions(this.player, box)) {
                if (this.player.velocityX > 0) this.player.x = box.x - this.player.width;
                else if (this.player.velocityX < 0) this.player.x = box.x + box.width;
                this.player.velocityX = 0;
            }
        }

        // Вертикальные коллизии
        this.player.velocityY += this.gravity;
        this.player.y += this.player.velocityY;
        this.player.onGround = false;

        for (const p of this.platforms) {
            const box = p.getCollisionBox();
            if (!this.collisions(this.player, box)) continue;

            const bottom = this.player.y + this.player.height;
            const prevBottom = bottom - this.player.velocityY;

            if (this.player.velocityY >= 0 && prevBottom <= box.y) {
                this.player.y = box.y - this.player.height;
                this.player.velocityY = 0;
                this.player.onGround = true;
            } else if (this.player.velocityY < 0 && this.player.y <= box.y + box.height) {
                this.player.y = box.y + box.height;
                this.player.velocityY = 0;
            }
        }

        this.enemies.forEach(e => e.update());
        this.coins.forEach(c => c.update());

        // Сбор монет
        this.coins = this.coins.filter(coin => {
            if (this.collisions(this.player, coin)) {
                this.score += 10;
                this.updateUI();
                return false;
            }
            return true;
        });

        this.enemies = this.enemies.filter(e => !e.markedForDeletion);

        // УРОВЕНЬ ПРОЙДЕН ТОЛЬКО ПО МОНЕТАМ (враги не обязательны)
        if (this.coins.length === 0) {
            this.gameState = 'levelComplete';
        }

        // Смерть
        if (this.player.y > 900 || this.lives <= 0) {
            if (this.lives <= 0) {
                this.gameState = 'gameOver';
            } else {
                this.player.takeDamage();
            }
        }

        // Камера
        const targetX = this.player.x - this.width / 2 + 50;
        const targetY = this.player.y - this.height + 180;
        this.cameraX += (targetX - this.cameraX) * 0.08;
        this.cameraY += (targetY - this.cameraY) * 0.12;
        this.cameraX = Math.max(0, Math.min(this.cameraX, this.worldWidth - this.width));
        this.cameraY = Math.max(0, Math.min(this.cameraY, 660 - this.height));
    }

    render() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.5, '#AED6F1');
        gradient.addColorStop(1, '#E0F7FA');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        if (this.gameState === 'menu') return this.drawMenu();
        if (this.gameState === 'levelComplete') return this.drawLevelComplete();
        if (this.gameState === 'gameOver') return this.drawGameOver();
        if (!this.ready) return this.drawLoading();

        this.ctx.save();
        this.ctx.translate(-this.cameraX, -this.cameraY);

        this.platforms.forEach(p => p.draw());
        this.coins.forEach(c => c.draw());
        this.enemies.forEach(e => e.draw());
        this.player.draw();

        this.ctx.restore();
    }

    renderWorld() {
        this.ctx.save();
        this.ctx.translate(-this.cameraX, -this.cameraY);
        this.platforms.forEach(p => p.draw());
        this.coins.forEach(c => c.draw());
        this.enemies.forEach(e => e.draw());
        this.player.draw();
        this.ctx.restore();
    }

drawMenu() {
    this.ctx.fillStyle = 'rgba(0,0,0,0.75)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    this.ctx.fillStyle = '#FFD700';
    this.ctx.font = 'bold 80px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('ПЛАТФОРМЕР', this.width/2, 180);
    
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '40px Arial';
    this.ctx.fillText(`Текущий уровень: ${this.currentLevel}`, this.width/2, 260);
    
    this.ctx.font = '32px Arial';
    this.ctx.fillText('1 · 2 · 3 — выбрать уровень', this.width/2, 340);
    this.ctx.fillText('ENTER — начать игру', this.width/2, 390);
    
    // Если хочешь, можешь добавить строку про рестарт (опционально):
    // this.ctx.fillText('R — рестарт в меню', this.width/2, 440);
}

    drawLevelComplete() {
        this.renderWorld();
        this.drawOverlay('УРОВЕНЬ ПРОЙДЁН!', 'Нажмите ENTER для следующего уровня');
    }

    drawGameOver() {
        this.renderWorld();
        this.drawOverlay('GAME OVER', 'ENTER для меню');
    }

    drawOverlay(title, subtitle) {
        this.ctx.fillStyle = 'rgba(0,0,0,0.85)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = 'bold 70px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(title, this.width/2, this.height/2 - 40);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '36px Arial';
        this.ctx.fillText(subtitle, this.width/2, this.height/2 + 40);
    }

    drawLoading() {
        this.ctx.fillStyle = 'rgba(0,0,0,0.9)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Загрузка уровня...', this.width/2, this.height/2);
    }
}