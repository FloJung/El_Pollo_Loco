class Endboss extends MovableObject {
    height = 350;
    width = 500;
    y = -30;
    speed = 20;
    isAttacking = false;
    isMovingBack = false;
    isDying = false; // Zustand für das Sterben
    originalX = 700 * 2.5;
    attackInterval;
    animateInterval;
    moveInterval; // Hinzugefügt: Intervall für die Bewegung

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

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.originalX;
        this.energy = 100;
        this.animate();
        this.attack();
    }

    takeDamage(amount) {
        this.energy -= amount;
        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
        }
    }

    isAlive() {
        return this.energy > 0;
    }

    moveForward() {
        this.x -= 200;
    }

    moveRight() {
        this.isMovingBack = true;
        this.moveInterval = setInterval(() => {
            if (this.x < this.originalX) {
                this.x += this.speed;
                this.playAnimation(this.IMAGES_WALK);
            } else {
                clearInterval(this.moveInterval);
                this.isMovingBack = false;
                if (!this.isDying) {
                    this.playAnimation(this.IMAGES_ALERT);
                }
            }
        }, 200);
    }

    attack() {
        this.attackInterval = setInterval(() => {
            if (!this.isAttacking && !this.isMovingBack && !this.isDying) { 
                this.isAttacking = true;
                let index = 0;
                const interval = setInterval(() => {
                    if (index === 5) { 
                        this.moveForward();
                    }
                    if (index >= this.IMAGES_ATTACK.length) {
                        clearInterval(interval);
                        this.isAttacking = false;
                        this.moveRight();
                    } else {
                        this.loadImage(this.IMAGES_ATTACK[index]);
                        index++;
                    }
                }, 400); 
            }
        }, Math.random() * (7000 - 1000) + 1000);
    }

    animate() {
        this.animateInterval = setInterval(() => {
            if (!this.isAttacking && !this.isMovingBack && !this.isDying) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 150);
    }

    die() {
        this.isDying = true;
        clearInterval(this.attackInterval);
        clearInterval(this.animateInterval);
        clearInterval(this.moveInterval); 
        let index = 0;
        const interval = setInterval(() => {
            if (index >= this.IMAGES_DEAD.length) {
                clearInterval(interval);
                setTimeout(() => {
                    this.removeFromWorld();
                }, 2000);
            } else {
                this.loadImage(this.IMAGES_DEAD[index]);
                index++;
            }
        }, 200); 
    }
}
