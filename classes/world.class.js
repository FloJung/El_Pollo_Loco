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
    isPlaying = false;
    score = 0; 
    isMuted = false;
    lastThrowTime = 0;
    mute = document.getElementById('muteGame');

    throwAudio = new Audio('audio/throwNew.mp3');
    coinAudio = new Audio('audio/coin.mp3');
    collectBottleAudio = new Audio('audio/collect.mp3');
    winAudio = new Audio('audio/win.mp3');
    loseAudio = new Audio('audio/lose.mp3');
    gameAudio = new Audio('audio/gameSound.mp3');

    constructor(canvas, keyboard, isMuted = false) {
        this.isMuted = isMuted;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.collisions = new Collisions(this);
        this.setWorld();
        this.drawStartScreen();
        this.updateScore();
        this.winAudio.volume = 0.4;
        this.gameAudio.volume = 0.3;
        this.gameAudio.loop = true; 
        this.gameAudio.currentTime = 0;
    }

    /**
    Toggles the mute state of the game and updates the mute button text.
    */
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.mute.innerHTML = this.isMuted ? 'Unmute' : 'Mute';
        if(this.isMuted) {
            this.gameAudio.pause();
        } else {
            this.gameAudio.play();
        }
    }
    
    /**
    Manages the playback of game background music based on the game's current state and sound settings.
    */
    music() {
        setInterval(() => {
            if (this.gameStarted && !this.gameOver && !this.gameWin) {
                if (!this.isMuted) {              
                    if (!this.gameAudio.isPlaying) {
                        this.gameAudio.play();
                        this.gameAudio.isPlaying = true;
                    }
                } else {
                    this.gameAudio.pause();
                    this.gameAudio.isPlaying = false;
                }
            } else {
                this.gameAudio.pause();
                this.gameAudio.isPlaying = false;
            }
        }, 500); 
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
        this.gameAudio.currentTime = 0;
    }
    
    /**
    Starts the game, initializing levels, setting up characters, and beginning the game loop.
    */
    startGame() {
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.music(); // Immer die Musik-Funktion aufrufen
            initLevel();
            this.level = level1;
            this.character = new Character();
            this.level.enemies.forEach(enemy => {
                enemy.world = this;
            });
            this.level.boss.forEach(boss => {
                if (boss instanceof Endboss) {
                    boss.world = this;
                }
            });
            this.setWorld();
            this.draw();
            this.run();
            document.getElementById('scoreDisplay').classList.add("scoreOut");
            // Stellen Sie sicher, dass der Mute-Status im Button korrekt angezeigt wird
            this.mute.innerHTML = this.isMuted ? 'Unmute' : 'Mute';
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
        // this.drawRESETScreen();
        
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
            setTimeout(() => {
                this.winScoreSreen();
            }, 1000);
        } else if (this.gameOver) {
            this.drawEndScreen();
            setTimeout(() => {
                this.clearCanvas();
                this.drawRESETScreen();
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
                this.collisions.checkCollisions(); // Nutze die neue Kollisionsklasse
                this.checkForGameOverCondition();
            }
        }, 160);
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
        this.gameAudio.pause(); 
        this.character = null;
    }

    /**
    Triggers the game win sequence, updating the score and playing the win audio.
    */
    winGame() {
        this.updateScore();
        document.getElementById('scoreDisplay').classList.remove("scoreOut");
        this.gameWin = true;
        this.gameAudio.pause(); 
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
