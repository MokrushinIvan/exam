// js/Player.js — ФИНАЛЬНАЯ ВЕРСИЯ БЕЗ ПРОПУСКОВ КАДРОВ
export default class Player {
    constructor(game) {
        this.game = game;
        this.width = 48;
        this.height = 48;
        this.x = 100;
        this.y = 100;
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 3;
        this.jumpPower = -11;
        this.onGround = false;
        this.accel = 0.8;

        this.animations = { idle: [], run: [], jump: [] };
        this.currentAnimation = 'idle';
        this.frameIndex = 0;
        this.frameTimer = 0;
        this.frameInterval = 16;

        this.previousAnimation = null;

        this.placeholder = this.createPlaceholderImage();
        this.visible = true;
    }

    createPlaceholderImage() {
        const canvas = document.createElement('canvas');
        canvas.width = 48;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(255,0,0,0.6)';
        ctx.fillRect(0, 0, 48, 64);
        return canvas;
    }

    async loadAnimations() {
        const loadImage = (src) => new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => {
                console.warn("Спрайт не найден:", src);
                resolve(this.placeholder);
            };
            img.src = src;
        });

        this.animations.idle = await Promise.all([
            'playerIdle1.png', 'playerIdle2.png', 'playerIdle3.png', 'playerIdle1.png'
        ].map(f => loadImage(`assets/images/player/${f}`)));

        this.animations.run = await Promise.all([
            'playerRun1.png','playerRun2.png','playerRun3.png','playerRun4.png',
            'playerRun5.png','playerRun6.png','playerRun7.png','playerRun8.png'
        ].map(f => loadImage(`assets/images/player/${f}`)));

        this.animations.jump = await Promise.all([
            'playerJump1.png','playerJump2.png','playerJump3.png',
            'playerFall1.png','playerFall2.png'
        ].map(f => loadImage(`assets/images/player/${f}`)));

        console.log("Анимации загружены без пропусков!");
    }

    update() {
        // === ТОЛЬКО АНИМАЦИЯ ===
        let newAnimation;
        if (!this.onGround) newAnimation = 'jump';
        else if (Math.abs(this.velocityX) > 0.3) newAnimation = 'run';
        else newAnimation = 'idle';

        if (newAnimation !== this.currentAnimation) {
            this.currentAnimation = newAnimation;
            this.frameIndex = 0;
            this.frameTimer = 0;
        }

        this.frameTimer++;
        const animLen = this.animations[this.currentAnimation].length;
        if (this.frameTimer >= this.frameInterval) {
            this.frameTimer = 0;
            this.frameIndex = (this.frameIndex + 1) % animLen;
        }
    }

    jump() { 
        if (this.onGround) { 
            this.velocityY = this.jumpPower; 
            this.onGround = false; 
        } 
    }
    moveLeft()  { this.velocityX = Math.max(this.velocityX - this.accel, -this.speed); }
    moveRight() { this.velocityX = Math.min(this.velocityX + this.accel, this.speed); }
    stop() { 
        this.velocityX *= 0.7; 
        if (Math.abs(this.velocityX) < 0.1) this.velocityX = 0; 
    }

    draw() {
        if (!this.visible) return;

        const img = this.animations[this.currentAnimation][this.frameIndex] || this.placeholder;

        this.game.ctx.save();

        if (this.velocityX < -0.3) {
            this.game.ctx.translate(this.x + this.width, this.y);
            this.game.ctx.scale(-1, 1);
            this.game.ctx.drawImage(img, 0, 0, this.width, this.height);
        } else {
            this.game.ctx.drawImage(img, this.x, this.y, this.width, this.height);
        }

        this.game.ctx.restore();
    }

    takeDamage() {
        if (this.game.gameState !== 'playing') return;
        this.game.lives--;
        this.game.updateUI();

        // Респавн на ПОЛЕ текущего уровня
        this.x = 200;
        this.y = this.game.platforms[0].y - this.height ;
        this.velocityX = this.velocityY = 0;
        this.onGround = true;

        let flashes = 0;
        const flash = () => {
            this.visible = !this.visible;
            flashes++;
            if (flashes < 8) setTimeout(flash, 120);
            else this.visible = true;
        };
        flash();
    }
}