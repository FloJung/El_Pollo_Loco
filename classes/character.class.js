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
        this.initAnimation();
    }

    initAnimation() {
        this.manageMovement();
        this.manageStateAnimations();
    }

    manageMovement() {
        setInterval(() => {
            this.walkingAudio.pause();
            this.handleKeyboardInputs();
            this.adjustCamera();
        }, 1000 / 60);
    }

    handleKeyboardInputs() {
        if (this.world.keyboard.RIGHT) {
            this.moveRightAndPlayAudio();
        }
        if (this.world.keyboard.LEFT) {
            this.moveLeftAndPlayAudio();
        }
        if (this.world.keyboard.UP && this.y === 240) {
            this.jumpAndPlayAudio();
        }
    }

    moveRightAndPlayAudio() {
        if (this.x < world.level.levelEnd_x) {
            this.otherDirection = false;
            this.moveRight();
            this.playAudioIfNotMuted(this.walkingAudio);
        }
    }

    moveLeftAndPlayAudio() {
        if (this.x > 0) {
            this.otherDirection = true;
            this.moveLeft();
            this.playAudioIfNotMuted(this.walkingAudio);
        }
    }

    jumpAndPlayAudio() {
        this.jump();
        this.playAudioIfNotMuted(this.jumpAudio);
    }

    playAudioIfNotMuted(audio) {
        if (!this.world.isMuted) {
            audio.play();
        }
    }

    adjustCamera() {
        this.world.camera_x = -this.x + 100;
    }

    manageStateAnimations() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.die();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.playAudioIfNotMuted(this.hurtAudio);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                this.handleWalkingAnimation();
            }
        }, 160);
    }

    handleWalkingAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
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
}