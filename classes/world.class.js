class World {
    ctx;
    keyboard;
    canvas;
    camera_x = 0;
    statusbar = new StatusBar();
    gameOverlay = new GameOverlay();
    chicken = new Chicken();

    throwableObject = [];
    collectedBottles = 0;
    maxBottles = 5;
    level;
    gameOver = false;
    gameWin = false;
    gameStarted = false;
    score = 0; 
    isMuted = false;
    lastThrowTime = 0;
    mute = document.getElementById('muteGame');

    throwAudio = new Audio('audio/throwNew.mp3');
    coinAudio = new Audio('audio/coin.mp3');
    collectBottleAudio = new Audio('audio/collect.mp3');
    winAudio = new Audio('audio/win.mp3');
    loseAudio = new Audio('audio/lose.mp3');
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.drawStartScreen();
        this.updateScore();
        this.winAudio.volume = 0.2;
    }

    /**
    Toggles the mute state of the game and updates the mute button text.
    */
    toggleMute() {
        if(this.gameOver || this.gameWin) {
            this.isMuted = this.isMuted;
            this.mute.innerHTML = this.isMuted = 'Unmute';
        } else if (!this.gameOver && !this.gameWin) {
            this.isMuted = !this.isMuted;
            this.mute.innerHTML = this.isMuted ? 'Unmute' : 'Mute';
        }
    }

    /**
    Sets references to the world object for characters and game overlays to ensure they can interact with the game environment.
    */
    setWorld() {
        if (this.character) {
            this.character.world = this;
        }
        this.gameOverlay.world = this;
    }

    /**
    Draws the initial start screen of the game.
    */
    drawStartScreen() {
        this.gameOverlay.loadImage(this.gameOverlay.IMAGE_START[0]);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.gameOverlay.img, 0, 0, this.canvas.width, this.canvas.height);
    }

    /**
    Resets the game to its initial state, clearing the canvas and reinitializing game components.
    */
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
        this.mute.innerHTML = 'Mute';
    }

    /**
    Starts the game, initializing levels, setting up characters, and beginning the game loop.
    */
    startGame() {
        if (!this.gameStarted) {
            this.gameStarted = true;
            initLevel();
            this.level = level1;
            this.character = new Character();
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Chicken) {
                    enemy.world = this;
                }});
            this.level.boss.forEach(boss => {
                if (boss instanceof Endboss) {
                    boss.world = this;
                }
            });
            this.setWorld();
            this.draw();
            this.run();
            document.getElementById('scoreDisplay').classList.add("scoreOut");
        }
    }

    /**
    Draws the end screen upon game completion.
    */
    drawEndScreen() {
        this.gameOverlay.loadImage(this.gameOverlay.IMAGE_OVER[1]);
        this.ctx.drawImage(this.gameOverlay.img, 0, 0, this.canvas.width, this.canvas.height);
    }

    /**
    Draws the reset screen, offering options to restart or adjust game settings.
    */
    drawRESETScreen() {
        document.getElementById('scoreDisplay').classList.remove("scoreOut");
        document.getElementById('startGame').classList.remove("scoreOut");
        this.gameOverlay.loadImage(this.gameOverlay.IMAGE_RESET[0]);
        this.ctx.drawImage(this.gameOverlay.img, 0, 0, this.canvas.width, this.canvas.height);
    }

    /**
    Clears the canvas for redrawing.
    */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawRESETScreen();
    }

    /**
    Displays the score and start game button for a new game or continuation.
    */
    winScoreSreen() {
        document.getElementById('scoreDisplay').classList.remove("scoreOut");
        document.getElementById('startGame').classList.remove("scoreOut");
    }

    /**
    Main drawing loop for the game, handling all drawable objects and game state displays.
    */
    draw() {
        if (this.gameWin) {
            this.toggleMute();
            this.winScoreSreen();
        } else if (this.gameOver) {
            this.drawEndScreen();
            this.toggleMute();
            setTimeout(() => {
                this.clearCanvas();
            }, 2000);
        } else if (!this.gameStarted) {
            this.drawStartScreen();
        } else {
            document.getElementById('startGame').classList.add("scoreOut");
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

    /**
    Adds drawable objects to the canvas, ensuring they are drawn within the camera's view.
    @param {Array} objekts - An array of drawable objects to add to the map.
    */
    addObjektToMap(objekts) {
        objekts.forEach(o => {
            if (!o.removed) {
                this.addToMap(o);
            }
        });
    }

    /**
    Adds a single movable object to the map, handling direction flipping for correct display.
    @param {MovableObject} mo - The movable object to add to the canvas.
    */
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

    /**
    Flips an image of a movable object for correct orientation when moving in the opposite direction.
    @param {MovableObject} mo - The object whose image is to be flipped.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.img.width / 4, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    Restores the original orientation of a flipped image after drawing.
    @param {MovableObject} mo - The object whose image was flipped.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
    Runs game updates at a set interval, checking for object interactions and game state changes.
    */
    run() {
        this.runInterval = setInterval(() => {
            if (this.gameStarted && !this.gameOver && !this.gameWin) {
                this.checkThrowObjects();
                this.checkCollisions();
                this.checkBottleCollisions();
                this.checkForGameOverCondition();
            }
        }, 160);
    }

    checkCollisions() {
        if (this.gameWin || this.gameOver) return;
        this.filterRemovedEnemies();
        this.handleEnemyCollisions();
        this.handleBossCollisions();
        this.handleBottleCollisions();
        this.handleCoinCollisions();
        this.checkBottleCollisions();
    }
    
    /**
    Filters out and removes defeated or inactive enemies from the game.
    */
    filterRemovedEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy => {
            const isRemoved = enemy.removed;
            return !isRemoved;
        });
    }
    
    /**
    Handles collisions between the player character and enemies, processing damage and game responses.
    */
    handleEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            if (enemy.isAlive()) {
                if (this.character.isLandingOnTop(enemy)) {
                    enemy.takeDamage(100);
                    this.score += 50;
                    this.updateScore();
                } else if (this.character.isColliding(enemy)) {
                    this.characterTakeDamage();
                }
            }
        });
    }

    /**
    Processes interactions and collisions with the game's boss characters.
    */
    handleBossCollisions() {
        this.level.boss.forEach(boss => {
            if (boss.isAlive()) {
                if (this.character.isColliding(boss)) {
                    this.characterTakeDamage();}
            } else if (this.score < 500) {
                setTimeout(() => {
                    this.updateScore();
                    this.score += 500;
                    this.winGame();
                }, 500);
            }
        });
    }

    /**
    Handles damage taken by the player character upon collisions with enemies or hazardous objects.
    */
    characterTakeDamage() {
        if (!this.character.invulnerable) {
            this.character.hit();
            this.statusbar.setPercentage(this.character.energy);
        }
    }

    /**
    Processes collisions with collectible bottles, adding them to the player's inventory.
    */
    handleBottleCollisions() {
        this.level.bottle.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.collectBottle(bottle);
            }
        });
    }

    /**
    Processes collisions with coins, increasing the player's score.
    */
    handleCoinCollisions() {
        this.level.coin.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(coin);
            }
        });
    }
    
    /**
    Checks for and handles collisions between throwable objects and enemies or bosses.
    */
    checkBottleCollisions() {
        if (this.gameWin || this.gameOver) return;
    
        this.throwableObject.forEach((bottle) => {
            // Kollision mit Bossen
            this.level.boss.forEach((boss) => {
                if (bottle.isColliding(boss)) {
                    boss.takeDamage(20);
                    this.statusbar.setBossCounter(boss.energy);
                    bottle.removeFromWorld();
                }
            });
    
            // Kollision mit normalen Gegnern
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    enemy.takeDamage(100);
                    bottle.removeFromWorld();
                }
            });
        });
    
        // Filtert entfernte Wurfobjekte aus dem Array heraus
        this.throwableObject = this.throwableObject.filter(bottle => !bottle.removed);
    }

    /**
    Adds a collected bottle to the player's inventory and plays a sound effect if the game is not muted.
    @param {DrawableObject} bottle - The bottle object to collect.
    */
    collectBottle(bottle) {
        if (this.collectedBottles < this.maxBottles) {
            bottle.removeFromWorld();
            this.level.bottle = this.level.bottle.filter(b => !b.removed);
            this.collectedBottles++;
            this.statusbar.increaseBottles();
            if(!this.isMuted) {
                this.collectBottleAudio.play();
            }
        }
    }

    /**
    Collects a coin, updates the score, and plays a sound effect.
    @param {DrawableObject} coin - The coin object to collect.
    */
    collectCoin(coin) {
        coin.removeFromWorld();
        this.level.coin = this.level.coin.filter(c => !c.removed);
        this.statusbar.increaseCoins();
        this.score += 10;
        this.updateScore();
        if(!this.isMuted) {
            this.coinAudio.play();
        } 
    }

    checkThrowObjects() {
        if (this.gameWin || this.gameOver) return;
        if (this.isThrowAllowed()) {
            this.createAndThrowObject();
            this.updateBottleStatus();
            this.playThrowSound();
         }
    }
    
    /**
    Checks if throwing an object is currently allowed based on game rules and timing.
    @returns {boolean} True if the player can throw an object, false otherwise.
    */
    isThrowAllowed() {
        let currentTime = Date.now();
        return this.keyboard.THROW && this.collectedBottles > 0 && currentTime - this.lastThrowTime >= 400;
    }

    /**
    Creates a new throwable object and adds it to the game world.
    */
    createAndThrowObject() {
        this.lastThrowTime = Date.now();
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 50);
        this.throwableObject.push(bottle);
        this.collectedBottles--;
    }

    /**
    Updates the display of available bottles after throwing one.
    */
    updateBottleStatus() {
        this.statusbar.setBottleCounter(this.collectedBottles * 20);
    }

    /**
    Plays the sound effect for throwing an object, if the game is not muted.
    */
    playThrowSound() {
        if (!this.isMuted) {
            this.throwAudio.play();
        }
    }

    /**
    Updates the displayed game score.
    */
    updateScore() {
        document.getElementById('yourScore').innerText = this.score;
    }

    /**
    Ends the game and clears the game area, typically called when the player loses.
    */
    endGame() {
        this.gameOver = true;
        this.character = null;
    }

    /**
    Triggers the game win sequence, updating the score and playing the win audio.
    */
    winGame() {
        this.updateScore();
        document.getElementById('scoreDisplay').classList.remove("scoreOut");
        this.gameWin = true;
        if(!this.isMuted) {
            this.winAudio.play();
        }
        this.character = null;
    }
    
    /**
    Checks for game-over conditions, such as running out of essential resources.
    */
    checkForGameOverCondition() {
        if (this.level.bottle.length === 0 && this.collectedBottles === 0) {
            setTimeout(() => {
                    this.character.die();
            }, 2000);  
        }
    }
}
