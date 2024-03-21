class Endboss extends MovableObject{
    height = 350;
    width = 500;
    y = -30;
    IMAGES_WARLKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WARLKING[0]);
        this.loadImages(this.IMAGES_WARLKING);
        this.x = 700 * 2.5;
        this.animate();
    }


    animate() {
        setInterval(() =>{
            this.playAnimation(this.IMAGES_WARLKING);    
        },150);
    }
}