class World {
    
    
    ctx;
    keyboard;
    canvas;
    character = new Character();
    enemies = [
                new Chicken(),
                new Chicken(),
                new Chicken(),
                ];
    clouds = [
            new Cloud(),
    ];

    backgroundObjekts = [
        new BackgroundObjekt('img/5_background/layers/air.png', 0,),
        new BackgroundObjekt('img/5_background/layers/3_third_layer/1.png', 0,),
        new BackgroundObjekt('img/5_background/layers/2_second_layer/1.png', 0,),
        new BackgroundObjekt('img/5_background/layers/1_first_layer/1.png', 0,),
    ];
    

    constructor(canvas, keyboard) {
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        
        
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjektToMap(this.backgroundObjekts);
        this.addToMap(this.character);
        
        this.addObjektToMap(this.clouds);
        this.addObjektToMap(this.enemies);
        
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjektToMap(objekts) {
        objekts.forEach(o => {
            this.addToMap(o);
    });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.img.width/3, 0);
            this.ctx.scale(-1,1);
            mo.x = mo.x *-1;
        }

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.height, mo.width);

        if (mo.otherDirection) {
            mo.x = mo.x *-1;
            this.ctx.restore();
        }
    }
}