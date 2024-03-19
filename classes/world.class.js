class World {
    canvas = new Character();
    ctx;
    character = new Character();
    enemies = [
                new Chicken(),
                new Chicken(),
                new Chicken(),
                ];
    clouds = [
            new Cloud(),
    ];



    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.height, this.character.width);

        this.enemies.forEach(enemie => {
            this.ctx.drawImage(enemie.img, enemie.x, enemie.y, enemie.height, enemie.width);

        });

        this.clouds.forEach(clouds => {
            this.ctx.drawImage(clouds.img, clouds.x, clouds.y, clouds.height, clouds.width);

        })

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
}