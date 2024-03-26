class StatusCoin extends StatusBar{
    
    percentage = 100;
    IMAGES_COIN = ['img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',];

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 30;
        this.y = 0;
        this.drawableObject.setCoinCounter(100);
    }


    setCoinCounter(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.drawableObject.imageCache[path];
        
    }
}