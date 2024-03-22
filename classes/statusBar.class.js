class StatusBar extends DrawableObject {

    IMAGES_LIFE = ['img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    IMAGES_COIN = ['img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    IMAGES_BOTTLE = ['img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    percentage = 100;
    coins = 100;
    bottles = 100;
    x = 30;
    y = 0;
    width = 600;
    height = 330;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_LIFE);
        this.loadImages(this.IMAGES_COIN);
        this.x = 50;
        
        this.width = 230;
        this.height = 60;
        this.setPercentage(100);
        this.setCoinCounter(100);
        this.setBottleCounter(100);
    }

    drawAllStatusBars(ctx) {
        // Zeichne Lebensanzeige
        let lifeImage = this.imageCache[this.IMAGES_LIFE[this.resolveImageIndex()]];
        this.drawSpecific(ctx, lifeImage, this.x, this.y, this.width, this.height);
    
        // Zeichne Münzanzeige
        let coinImage = this.imageCache[this.IMAGES_COIN[this.resolveImageIndex()]];
        this.drawSpecific(ctx, coinImage, this.x, this.y + 60, this.width, this.height);
    
        // Zeichne Flaschenanzeige
        let bottleImage = this.imageCache[this.IMAGES_BOTTLE[this.resolveImageIndex()]];
        this.drawSpecific(ctx, bottleImage, this.x, this.y + 120, this.width, this.height); 
    }
    
    
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIFE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        
    }
    
    setCoinCounter(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        
    }
    
    setBottleCounter(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
       
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
