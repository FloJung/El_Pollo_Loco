class StatusBar extends DrawableObject {

    IMAGES_LIFE = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    IMAGES_BOSSBAR = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    percentage = 100;
    bossLife = 100;
    coins = 0;
    bottles = 0;
    x = 30;
    y = 0;
    width = 600;
    height = 330;
    maxBottles = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_LIFE);
        this.loadImages(this.IMAGES_COIN);
        this.loadImages(this.IMAGES_BOSSBAR);
        this.x = 30;
        this.width = 230;
        this.height = 60;
        this.setPercentage(100);
        this.setCoinCounter(0); 
        this.setBottleCounter(0); 
        this.setBossCounter(100);
    }

    /**
    Draws all the status bars (life, coins, and bottles) on the provided canvas context.
    @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
    */
    drawAllStatusBars(ctx) {
        // Lebensanzeige
        let lifeImage = this.imageCache[this.IMAGES_LIFE[this.resolveImageIndex(this.percentage)]];
        this.drawSpecific(ctx, lifeImage, this.x, this.y, this.width, this.height);
    
        // Münzanzeige
        let coinImage = this.imageCache[this.IMAGES_COIN[this.resolveImageIndex(this.coins)]];
        this.drawSpecific(ctx, coinImage, this.x, this.y + 45, this.width, this.height);
    
        // Flaschenanzeige
        let bottleImage = this.imageCache[this.IMAGES_BOTTLE[this.resolveImageIndex(this.bottles)]];
        this.drawSpecific(ctx, bottleImage, this.x, this.y + 90, this.width, this.height); 
    }
    
    /**
    Draws the boss life bar on the provided canvas context.
    @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
    */
    drawBOSSBAR(ctx) {
        let bossImage = this.imageCache[this.IMAGES_BOSSBAR[this.resolveImageIndex(this.bossLife)]];
        this.drawSpecific(ctx, bossImage, this.x + 390, this.y + 50, this.width + 50, this.height);
    }

    /**
    Sets the percentage of the life status bar and updates the displayed image.
    @param {number} percentage - The percentage of life remaining.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIFE[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }
    
    /**
    Sets the coin counter and updates the displayed coin status bar image.
    @param {number} coins - The number of coins collected.
    */
    setCoinCounter(coins) {
        this.coins = coins;
        let path = this.IMAGES_COIN[this.resolveImageIndex(coins)];
        this.img = this.imageCache[path];
    }

    /**
    Sets the bottle counter and updates the displayed bottle status bar image.
    @param {number} bottles - The number of bottles collected.
    */
    setBottleCounter(bottles) {
        this.bottles = bottles;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex(bottles)];
        this.img = this.imageCache[path];
    }
    
    /**
    Sets the boss life percentage and updates the displayed boss life bar image.
    @param {number} bossLife - The boss's current life percentage.
    */
    setBossCounter(bossLife) {
        this.bossLife = bossLife;
        let path = this.IMAGES_BOSSBAR[this.resolveImageIndex(bossLife)];
        this.img = this.imageCache[path];
    }

    /**
    Resolves the correct index for the status bar image based on a given value.
    @param {number} value - The current value (percentage or count) for which to find the corresponding image index.
    @returns {number} The index of the image that corresponds to the value.
    */
    resolveImageIndex(value) {
        if (value >= 100) {
            return 5;
        } else if (value > 80) {
            return 4;
        } else if (value > 60) {
            return 3;
        } else if (value > 40) {
            return 2;
        } else if (value > 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
    Increases the coin count and updates the coin status bar.
    */
    increaseCoins() {
        this.setCoinCounter(this.coins + 20);
    }

    /**
    Increases the bottle count and updates the bottle status bar.
    */
    increaseBottles() {
        this.setBottleCounter(this.bottles + 20);
    }
}
