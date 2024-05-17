class World {
    
    
    ctx;
    keyboard;
    canvas;
    camera_x = 0;
    character = new Character();
    statusbar = new StatusBar();
    throwableObject = [];

    level = level1;

    constructor(canvas, keyboard) {
        
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
        console.log(this.statusbar);
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
        this.addObjektToMap(this.level.coin);
        this.addObjektToMap(this.level.bottle);
        this.ctx.translate(-this.camera_x,0);
        // --------Space for fixed objects--------
        this.statusbar.drawAllStatusBars(this.ctx);
        this.statusbar.drawBOSSBAR(this.ctx);
        this.ctx.translate(this.camera_x,0);


        this.addObjektToMap(this.level.enemies);
        this.addObjektToMap(this.throwableObject);
        

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

    run() {
        setInterval(() => {
            this.checkThowObjects();
           this.checkCollisions();
        },200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit(); 
                this.statusbar.setPercentage(this.character.energy); 
            }
            if (this.character.isLandingOnTop(enemy)) {
                enemy.takeDamage(100);
                
            }
        });
    }
    

    checkThowObjects() {
        if (this.keyboard.THROW) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100) 
            this.throwableObject.push(bottle);
        }
    }
}