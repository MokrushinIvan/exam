export default class Coin {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.angle = 0;
    }

update() {
    this.angle += 0.05;  // ← ЗАМЕДЛИЛИ: было 0.1
}

    draw() {
        this.game.ctx.save();
        this.game.ctx.translate(this.x + 15, this.y + 15);
        this.game.ctx.rotate(this.angle);
        
        this.game.ctx.fillStyle = '#f1c40f';
        this.game.ctx.beginPath();
        this.game.ctx.arc(0, 0, 15, 0, Math.PI * 2);
        this.game.ctx.fill();
        
        this.game.ctx.fillStyle = '#f39c12';
        this.game.ctx.fillRect(-5, -5, 10, 10);
        
        this.game.ctx.restore();
    }
}