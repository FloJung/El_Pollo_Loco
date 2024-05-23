class Level {
    enemies;
    clouds;
    coin;
    bottle;
    backgroundObjekts;
    boss;
    levelEnd_x = 720 * 2.8;
    
    constructor(enemies,boss,clouds,coin,bottle,backgroundObjekts){
        this.enemies = enemies;
        this.boss = boss;
        this.clouds = clouds;
        this.coin = coin;
        this.bottle = bottle;
        this.backgroundObjekts = backgroundObjekts;
    }
}