class Chicken extends MovableObject {
    y = 335;
    height = 80;
    width = 100;
    chickenAudio = new Audio('audio/chick.mp3');
    audioPlayed = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 400 + Math.random() * 800;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.15 + Math.random() * 0.55;
        this.chickenAudio.volume = 0.2;
        this.setupIntervals();
    }

    /**
    Sets up the intervals for movement and animation management.
    */
    setupIntervals() {
        this.setupMovementInterval();
        this.setupAnimationInterval();
    }
    /**
    Establishes an interval for the chicken's leftward movement unless it is dead.
    */
    setupMovementInterval() {
        setInterval(() => {
            this.moveIfNotDead();
        }, 1000 / 60);
    }

    /**
    Moves the chicken left if it is not dead.
    */
    moveIfNotDead() {
        if (!this.isDead()) {
            this.moveLeft();  
            this.audioPlayed = false;
        }
    }

    /**
    Sets up an interval to manage animation based on the chicken's current state.
    */
    setupAnimationInterval() {
        setInterval(() => {
            this.animateBasedOnState();
        }, 160);
    }

    /**
    Chicken based on its current state, handling either walking or death animations.
    */
    animateBasedOnState() {
        if (this.isDead()) {
            this.handleDeath();
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
    /**
    Chicken's death animation and plays a death sound.
    */
    handleDeath() {
        if (!world.isMuted && !this.audioPlayed) { 
            this.chickenAudio.play();
            this.audioPlayed = true;  
        }
        this.playAnimation(this.IMAGES_DEAD);
    }
}
