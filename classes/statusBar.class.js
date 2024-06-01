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
    

    drawBOSSBAR(ctx) {
        let bossImage = this.imageCache[this.IMAGES_BOSSBAR[this.resolveImageIndex(this.bossLife)]];
        this.drawSpecific(ctx, bossImage, this.x + 390, this.y + 50, this.width + 50, this.height);
    }
    
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIFE[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }
    
    setCoinCounter(coins) {
        this.coins = coins;
        let path = this.IMAGES_COIN[this.resolveImageIndex(coins)];
        this.img = this.imageCache[path];
    }
    
    setBottleCounter(bottles) {
        this.bottles = bottles;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex(bottles)];
        this.img = this.imageCache[path];
    }

    setBossCounter(bossLife) {
        this.bossLife = bossLife;
        let path = this.IMAGES_BOSSBAR[this.resolveImageIndex(bossLife)];
        this.img = this.imageCache[path];
    }

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

    increaseCoins() {
        this.setCoinCounter(this.coins + 20);
    }

    increaseBottles() {
        this.setBottleCounter(this.bottles + 20);
    }
}
