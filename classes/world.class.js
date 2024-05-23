class World {
    
    
    ctx;
    keyboard;
    canvas;
    camera_x = 0;
    character = new Character();
    statusbar = new StatusBar();
    gameOverlay = new GameOverlay();
    throwableObject = [];
    collectedBottles = 0;
    maxBottles = 100;
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

    drawEndScreen() {
        this.gameOverlay.loadImage(this.gameOverlay.IMAGE_OVER[0]);
        this.ctx.drawImage(this.gameOverlay.img, 0, 0, this.canvas.width, this.canvas.height);
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
        this.addObjektToMap(this.level.boss);
        this.addObjektToMap(this.throwableObject);
        

        this.ctx.translate(-this.camera_x,0);
        
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    
    addObjektToMap(objekts) {
        objekts.forEach(o => {
            if (!o.removed) { 
                this.addToMap(o);
            }
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
        this.ctx.translate(mo.img.width/4, 0);
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
           this.checkBottleCollisions();
        },200);
    }

    
    checkCollisions() {
        this.level.enemies = this.level.enemies.filter((enemy) => {
            if (enemy.removed) {
                console.log(`${enemy.constructor.name} removed from enemies array`);
            }
            return !enemy.removed;
        }); // Entferne Gegner

        this.level.enemies.forEach((enemy) => {
            if (enemy.isAlive()) {
                if (this.character.isLandingOnTop(enemy)) {
                    enemy.takeDamage(100);
                    
                } else if (this.character.isColliding(enemy)) {
                    if (!this.character.invulnerable) {
                        this.character.hit();
                        this.statusbar.setPercentage(this.character.energy);
                        
                    }
                }
            }
        });

        this.level.boss.forEach((boss) => {
            if (boss.isAlive()) {
                if (this.character.isColliding(boss)) {
                    if (!this.character.invulnerable) {
                        this.character.hit();
                        this.statusbar.setPercentage(this.character.energy);  
                    }
                }
            }
        });


        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.collectBottle(bottle);
            }
        });

        this.level.coin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(coin);
            }
        });
        this.checkBottleCollisions();
    }

    checkBottleCollisions() {
        this.throwableObject.forEach((bottle) => {
            this.level.boss.forEach((boss) => {
                if (bottle.isColliding(boss)) {
                    boss.takeDamage(20);
                    this.statusbar.setBossCounter(boss.energy);
                    bottle.removeFromWorld();
                    console.log('Boss hit by bottle!');
                }
            });
        });
        // Entferne alle kollidierten Flaschen
        this.throwableObject = this.throwableObject.filter(bottle => !bottle.removed);
    }

    collectBottle(bottle) {
        console.log('Collected a bottle!');
        bottle.removeFromWorld();
        this.level.bottle = this.level.bottle.filter(b => !b.removed);
        this.collectedBottles++; // Anzahl der gesammelten Flaschen erhöhen
        this.statusbar.increaseBottles(); // Statusleiste aktualisieren
    }

    collectCoin(coin) {
        console.log('Collected a coin!');
        coin.removeFromWorld();
        this.level.coin = this.level.coin.filter(c => !c.removed);
        this.statusbar.increaseCoins(); // Statusleiste aktualisieren
    }

    checkThowObjects() {
        if (this.keyboard.THROW && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 50);
            this.throwableObject.push(bottle);
            this.collectedBottles--; // Anzahl der verfügbaren Flaschen verringern
            console.log(this.collectedBottles);
            this.statusbar.setBottleCounter(this.collectedBottles * 10); // Statusleiste aktualisieren
        }
    }
}