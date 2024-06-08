class Character extends MovableObject {
    height = 140;
    width = 200;
    speed = 5;
    y = 240;
    invulnerable = false;
    
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    
    world;
    walkingAudio = new Audio('audio/walking.mp3');
    jumpAudio = new Audio('audio/jump.mp3');
    hurtAudio = new Audio('audio/hurt.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walkingAudio.pause();
            if (this.world.keyboard.RIGHT && this.x < world.level.levelEnd_x) {
                this.otherDirection = false;
                this.moveRight();
                if(!world.isMuted) {
                    this.walkingAudio.play();
                }
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.otherDirection = true;
                this.moveLeft();
                if(!world.isMuted) {
                this.walkingAudio.play();
                }
            }
            if (this.world.keyboard.UP && this.y == 240) {
                this.jump();
                if(!world.isMuted) {
                this.jumpAudio.play();
                }
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.die();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if(!world.isMuted) {
                    this.hurtAudio.play();
                    }
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 160);
    }

    die() {
        this.energy = 0;
        this.isDying = true;
        this.speedY = 30;
        this.applyGravity();
        const deathInterval = setInterval(() => {
            if (this.y >= 240) {
                clearInterval(deathInterval);
                this.world.endGame();
            }
        }, 1000 / 60);
    }


    pauseSounds() {
        
    }
}


