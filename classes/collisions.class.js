class Collisions {
    constructor(world) {
        this.world = world;
    }

    checkCollisions() {
        if (this.world.gameWin || this.world.gameOver) return;
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
        this.world.level.enemies = this.world.level.enemies.filter(enemy => !enemy.removed);
    }

    /**
    Handles collisions between the player character and enemies, processing damage and game responses.
    */
    handleEnemyCollisions() {
        this.world.level.enemies.forEach(enemy => {
            if (enemy.isAlive()) {
                if (this.world.character.isLandingOnTop(enemy)) {
                    enemy.takeDamage(100);
                    this.world.score += 50;
                    this.world.updateScore();
                } else if (this.world.character.isColliding(enemy)) {
                    this.world.characterTakeDamage();
                }
            }
        });
    }

     /**
    Processes interactions and collisions with the game's boss characters.
    */
    handleBossCollisions() {
        this.world.level.boss.forEach(boss => {
            if (boss.isAlive()) {
                if (this.world.character.isColliding(boss)) {
                    this.world.characterTakeDamage();
                }
            } else if (this.world.score < 500) {
                setTimeout(() => {
                    this.world.updateScore();
                    this.world.score += 500;
                    this.world.winGame();
                }, 500);
            }
        });
    }

   /**
    Processes collisions with collectible bottles, adding them to the player's inventory.
    */
    handleBottleCollisions() {
        this.world.level.bottle.forEach(bottle => {
            if (this.world.character.isColliding(bottle)) {
                this.world.collectBottle(bottle);
            }
        });
    }

     /**
    Processes collisions with coins, increasing the player's score.
    */
    handleCoinCollisions() {
        this.world.level.coin.forEach(coin => {
            if (this.world.character.isColliding(coin)) {
                this.world.collectCoin(coin);
            }
        });
    }

    /**
    Checks for and handles collisions between throwable objects and enemies or bosses.
    */
    checkBottleCollisions() {
        this.world.throwableObject.forEach((bottle) => {
            this.world.level.boss.forEach((boss) => {
                if (bottle.isColliding(boss)) {
                    boss.takeDamage(20);
                    this.world.statusbar.setBossCounter(boss.energy);
                    bottle.removeFromWorld();
                }
            });
            this.world.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    enemy.takeDamage(100);
                    bottle.removeFromWorld();
                }
            });
        });
        this.world.throwableObject = this.world.throwableObject.filter(bottle => !bottle.removed);
    }
}
