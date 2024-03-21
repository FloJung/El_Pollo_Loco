class Level {
    enemies;
    clouds;
    backgroundObjekts;
    levelEnd_x = 720 * 2.8;
    
    constructor(enemies,clouds,backgroundObjekts){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjekts = backgroundObjekts;
    }
}