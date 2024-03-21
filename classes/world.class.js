class World {
    
    
    ctx;
    keyboard;
    canvas;
    camera_x = 0;
    character = new Character();
    statusbar = new StatusBar();

    level = level1;

    constructor(canvas, keyboard) {
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.checkCollisions();
        
    }


   

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x,0);
        
        this.addObjektToMap(this.level.backgroundObjekts);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x,0);
        // --------Space for fixed objects--------
        this.addToMap(this.statusbar);
        this.ctx.translate(this.camera_x,0);

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
        if (mo.otherDirection ) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.img.width/3, 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x *-1;
    }

    flipImageBack(mo) {
        mo.x = mo.x *-1;
        this.ctx.restore();
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy);
                }
            });
        },200);
    };
}