class SmallChicken extends Chicken {
    constructor() {
        super();
        
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING_CHICK);
        this.loadImages(this.IMAGES_DEAD_CHICK);
        this.height = 60;
        this.width = 80;
        this.x = 900 + Math.random() * 800;
        this.y = 355;
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];
}
