class Endboss extends MovableObject {
    height = 350;
    width = 500;
    y = -30;
    speed = 20;
    isAttacking = false;
    isMovingBack = false; // Neuer Zustand, der das Rückwärtslaufen überwacht
    originalX = 700 * 2.5;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALK);
        this.x = this.originalX;
        this.animate();
        this.attack();
    }

    moveForward() {
        this.x -= 200;  // Bewegt den Boss um 150px vorwärts
    }

    moveRight() {
        this.isMovingBack = true;  // Beginnt mit der Rückwärtsbewegung
        let moveInterval = setInterval(() => {
            if (this.x < this.originalX) {
                this.x += this.speed;
                this.playAnimation(this.IMAGES_WALK);
            } else {
                clearInterval(moveInterval);
                this.isMovingBack = false;  // Beendet die Rückwärtsbewegung
                this.playAnimation(this.IMAGES_ALERT);  // Kehrt zurück zur Alert-Animation
            }
        }, 200);
    }

    attack() {
        setInterval(() => {
            if (!this.isAttacking && !this.isMovingBack) {  // Verhindert Angriffe während der Rückwärtsbewegung
                this.isAttacking = true;
                let index = 0;
                const interval = setInterval(() => {
                    if (index === 5) { 
                        this.moveForward();
                    }
                    if (index >= this.IMAGES_ATTACK.length) {
                        clearInterval(interval);
                        this.isAttacking = false;
                        this.moveRight();  // Beginnt mit der Rückwärtsbewegung
                    } else {
                        this.loadImage(this.IMAGES_ATTACK[index]);
                        index++;
                    }
                }, 200); 
            }
        }, Math.random() * (7000 - 1000) + 1000);
    }

    animate() {
        setInterval(() => {
            if (!this.isAttacking && !this.isMovingBack) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 150);
    }
}
