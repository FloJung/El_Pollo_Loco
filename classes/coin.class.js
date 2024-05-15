class Coin extends StatusBar{
    
    width = 200;
    height = 200;

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = Math.random() * 700 * 2 + 300;
        this.y = Math.random() * 200 + 20;
    }

}