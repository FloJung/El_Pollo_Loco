class Level {
    enemies;
    clouds;
    coin;
    bottle;
    backgroundObjekts;
    levelEnd_x = 720 * 2.8;
    
    constructor(enemies,clouds,coin,bottle,backgroundObjekts){
        this.enemies = enemies;
        this.clouds = clouds;
        this.coin = coin;
        this.bottle = bottle;
        this.backgroundObjekts = backgroundObjekts;
    }
}