class World {
    
    
    ctx;
    keyboard;
    canvas;
    camera_x = 0;
    character = new Character();

    level = level1;

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

        this.ctx.translate(this.camera_x,0);

        this.addObjektToMap(this.level.backgroundObjekts);
        this.addToMap(this.character);
        
        this.addObjektToMap(this.level.clouds);
        this.addObjektToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x,0);
        
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