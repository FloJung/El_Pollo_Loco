class StatusBottle extends StatusBar{
    

    IMAGES_BOTTLE = ['img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 30;
        this.y = 0;
        this.drawableObject.setBottleCounter(100);
    }

    setBottleCounter(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.drawableObject.imageCache[path];
    }
}