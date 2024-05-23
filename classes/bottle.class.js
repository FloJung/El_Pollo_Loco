class Bottle extends MovableObject {
    
    width = 90;
    height = 30;

    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = 300 + Math.random() * 1400;
        this.y = 20 + Math.random() * 180;
    }

}