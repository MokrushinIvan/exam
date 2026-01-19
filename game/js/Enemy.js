// js/Enemy.js — СКОРСТЬ УМЕНЬШЕНА: walk=0.8 (было 1.2), fly=0.5 (было 0.8)
export default class Enemy {
    constructor(game, x, y, type = 'walk') {
        this.game = game;
        this.type = type;
        this.width = 40;
        this.height = 40;
        this.x = x;
        this.y = y;
        this.speed = type === 'walk' ? 0.8 : 0.5;  // ← УМЕНЬШЕНА СКОРОСТЬ!
        this.direction = Math.random() < 0.5 ? -1 : 1;
        this.frameIndex = 0;
        this.frameTimer = 0;
        this.frameInterval = 15;
        this.animations = { walk: [], fly: [] };
        this.alive = true;
        this.markedForDeletion = false;

        this.loadAnimations();
    }

    async loadAnimations() {
        const load = (src) => new Promise(r => {
            const img = new Image();
            img.onload = () => r(img);
            img.onerror = () => r(this.createPlaceholder());
            img.src = src;
        });

        const walk = await Promise.all([
            load('assets/images/enemies/enemyWalk1.png'),
            load('assets/images/enemies/enemyWalk2.png')
        ]);

        const fly = await Promise.all([
            load('assets/images/enemies/enemyFly1.png'),
            load('assets/images/enemies/enemyFly2.png')
        ]);

        this.animations.walk = walk;
        this.animations.fly = fly;
    }

    createPlaceholder() {
        const c = document.createElement('canvas');
        c.width = 40; c.height = 40;
        const ctx = c.getContext('2d');
        ctx.fillStyle = this.type === 'walk' ? '#e74c3c' : '#9b59b6';
        ctx.fillRect(0, 0, 40, 40);
        return c;
    }

    update() {
        if (!this.alive) return;

        this.frameTimer++;
        if (this.frameTimer >= this.frameInterval) {
            this.frameTimer = 0;
            const len = this.animations[this.type].length;
            this.frameIndex = (this.frameIndex + 1) % len;
        }

        if (this.type === 'walk') {
            this.x += this.speed * this.direction;

            // Разворот на краю платформы
            let onPlatform = false;
            for (const p of this.game.platforms) {
                if (this.x + this.width > p.x && this.x < p.x + p.width &&
                    this.y + this.height >= p.y && this.y + this.height <= p.y + 10) {
                    onPlatform = true;
                    if ((this.direction < 0 && this.x <= p.x) ||
                        (this.direction > 0 && this.x + this.width >= p.x + p.width)) {
                        this.direction *= -1;
                    }
                }
            }
            if (!onPlatform) this.direction *= -1;
        } else {
            // Летающий: синусоида
            this.x += this.speed * this.direction;
            this.y += Math.sin(Date.now() * 0.003) * 0.5;
            if (this.x < 0 || this.x > this.game.worldWidth - this.width) {
                this.direction *= -1;
            }
        }

        // Столкновение с игроком
        if (this.game.collisions(this.game.player, this)) {
            this.game.player.takeDamage();
            this.markedForDeletion = true;
        }
    }

    draw() {
        if (!this.alive) return;
        const img = this.animations[this.type][this.frameIndex] || this.createPlaceholder();

        this.game.ctx.save();
        if (this.direction < 0) {
            this.game.ctx.translate(this.x + this.width, this.y);
            this.game.ctx.scale(-1, 1);
            this.game.ctx.drawImage(img, 0, 0, this.width, this.height);
        } else {
            this.game.ctx.drawImage(img, this.x, this.y, this.width, this.height);
        }
        this.game.ctx.restore();
    }
}