// js/Platform.js
export default class Platform {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    getCollisionBox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height  // ← Фулл высота для боков/потолка!
        };
    }

    draw() {
        // Чёрная земля
        this.game.ctx.fillStyle = '#2c3e50';
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        // Зелёная травка — поверхность
        this.game.ctx.fillStyle = '#27ae60';
        this.game.ctx.fillRect(this.x, this.y, this.width, 10);
    }
}