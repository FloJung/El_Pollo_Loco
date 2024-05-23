class Coin extends MovableObject {
    
    width = 60;
    height = 60;

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 300 + Math.random() * 1400;
        this.y = 20 + Math.random() * 180;

        
    }

}