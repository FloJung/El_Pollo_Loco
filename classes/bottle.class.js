class Bottle extends MovableObject {
    
    width = 90;
    height = 30;

    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = Math.random() * 400 * 1.5  + 300;
        this.y = Math.random() * 200 + 20;
    }

}