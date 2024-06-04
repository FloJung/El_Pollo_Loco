class World {
    ctx;
    keyboard;
    canvas;
    camera_x = 0;
    statusbar = new StatusBar();
    gameOverlay = new GameOverlay();
    throwableObject = [];
    collectedBottles = 0;
    maxBottles = 100;
    level;
    gameOver = false;
    gameWin = false;
    gameStarted = false;
    score = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.setWorld();
        this.drawStartScreen();
        this.initEventListeners();
        console.log(this.statusbar);
        this.updateScore();
    }

    setWorld() {
        if (this.character) {
            this.character.world = this;
        }
        this.gameOverlay.world = this;
    }

    drawStartScreen() {
        console.log('Start');
        console.log(this.gameOverlay.loadImage(this.gameOverlay.IMAGE_START[0]));
        this.gameOverlay.loadImage(this.gameOverlay.IMAGE_START[0]);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.gameOverlay.img, 0, 0, this.canvas.width, this.canvas.height);
    }

    initEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.keyCode === 32) {
                this.startGame();
            }
        });
    }

    reset() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.keyboard = new Keyboard();
        this.character = null;
        this.statusbar = new StatusBar();
        this.gameOverlay = new GameOverlay();
        this.throwableObject = [];
        this.collectedBottles = 0;
        this.maxBottles = 100;
        this.level = null;
        this.gameOver = false;
        this.gameStarted = false;
        this.camera_x = 0;
        this.score = 0;
        this.gameWin = false;
    }

    startGame() {
        if (!this.gameStarted) {
            this.gameStarted = true;
            initLevel();
            this.level = level1;
            this.character = new Character();
            this.setWorld();
            this.draw();
            this.run();
            document.getElementById('scoreDisplay').classList.add("scoreOut");
        }
    }

    drawEndScreen() {
        this.gameOverlay.loadImage(this.gameOverlay.IMAGE_OVER[0]);
        this.ctx.drawImage(this.gameOverlay.img, 0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        if (this.gameWin || this.gameOver) {
            this.drawEndScreen();
            return;
        } else if (!this.gameStarted) {
            this.drawStartScreen();
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.translate(this.camera_x, 0);

            this.addObjektToMap(this.level.backgroundObjekts);
            if (this.character) {
                this.addToMap(this.character);
            }
            this.addObjektToMap(this.level.clouds);
            this.addObjektToMap(this.level.coin);
            this.addObjektToMap(this.level.bottle);
            this.ctx.translate(-this.camera_x, 0);
            // --------Space for fixed objects--------
            this.statusbar.drawAllStatusBars(this.ctx);
            this.statusbar.drawBOSSBAR(this.ctx);
            this.ctx.translate(this.camera_x, 0);

            this.addObjektToMap(this.level.enemies);
            this.addObjektToMap(this.level.boss);
            this.addObjektToMap(this.throwableObject);

            this.ctx.translate(-this.camera_x, 0);

            let self = this;
            requestAnimationFrame(function () {
                self.draw();
            });
        }
    }

    addObjektToMap(objekts) {
        objekts.forEach(o => {
            if (!o.removed) {
                this.addToMap(o);
            }
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
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
        this.ctx.translate(mo.img.width / 4, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    run() {
        this.runInterval = setInterval(() => {
            if (this.gameStarted && !this.gameOver && !this.gameWin) {
                this.checkThowObjects();
                this.checkCollisions();
                this.checkBottleCollisions();
            }
        }, 200);
    }

    checkCollisions() {
        if (this.gameWin || this.gameOver) return;  // Keine weiteren Kollisionen prüfen, wenn das Spiel gewonnen oder verloren ist

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
                    this.score += 50; // Increment score by 50 for each enemy
                    this.updateScore();
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
            } else if (this.score < 500) {
                setTimeout(() => {
                    this.updateScore();
                    this.score += 500;
                    this.winGame();
                }, 500);
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
        if (this.gameWin || this.gameOver) return;  // Keine weiteren Kollisionen prüfen, wenn das Spiel gewonnen oder verloren ist

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
        // Entferne Flaschen
        this.throwableObject = this.throwableObject.filter(bottle => !bottle.removed);
    }

    collectBottle(bottle) {
        if (this.collectedBottles < this.maxBottles) {
            console.log('Collected a bottle!');
            bottle.removeFromWorld();
            this.level.bottle = this.level.bottle.filter(b => !b.removed);
            this.collectedBottles++;
            this.statusbar.increaseBottles();
        }
    }

    collectCoin(coin) {
        console.log('Collected a coin!');
        coin.removeFromWorld();
        this.level.coin = this.level.coin.filter(c => !c.removed);
        this.statusbar.increaseCoins();
        this.score += 10; // Increment score by 10 for each coin
        this.updateScore();
    }

    checkThowObjects() {
        if (this.gameWin || this.gameOver) return;  // Keine weiteren Aktionen ausführen, wenn das Spiel gewonnen oder verloren ist

        if (this.keyboard.THROW && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 50);
            this.throwableObject.push(bottle);
            this.collectedBottles--;
            console.log(this.collectedBottles);
            this.statusbar.setBottleCounter(this.collectedBottles * 10);
        }
    }

    updateScore() {
        document.getElementById('yourScore').innerText = this.score;
    }

    endGame() {
        this.gameOver = true;
        this.character = null;  // Entferne den Charakter
    }

    winGame() {
        this.updateScore();
        console.log('Game Over. Final Score:', this.score);
        document.getElementById('scoreDisplay').classList.remove("scoreOut");
        this.gameWin = true;
        this.character = null;  // Entferne den Charakter
    }
}
