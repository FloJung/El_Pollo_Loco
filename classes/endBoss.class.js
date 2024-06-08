class Endboss extends MovableObject {
    height = 350;
    width = 500;
    y = -30;
    speed = 30;
    isAttacking = false;
    isMovingBack = false;
    isDying = false;
    originalX = 700 * 2.5;
    hadFirstContact = false;

    walkAudio = new Audio('audio/walking.mp3');
    wingsAudio = new Audio('audio/flappingWings.mp3');

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
        this.initEndboss();
    }
    /**
    Initializes the Endboss settings, loads images, sets the starting position and audio levels, and starts animations and attacks.
    */
    initEndboss() {
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.originalX;
        this.energy = 100;
        this.setAudioLevels();
        this.animate();
        this.attack();
    }
    /**
    Sets the volume levels for the audio components of the Endboss.
    */
    setAudioLevels() {
        this.walkAudio.volume = 0.5;
        this.wingsAudio.volume = 0.5;
    }

    /**
    Reduces the Endboss's energy by a specified amount and triggers death if energy falls to zero or below.
    @param {number} amount - The amount of damage to take.
    */
    takeDamage(amount) {
        this.energy -= amount;
        if (this.energy <= 0) {
            this.die();
        }
    }

    /**
    Returns true if the Endboss is still alive, based on its energy level.
     */
    isAlive() {
        return this.energy > 0;
    }

    /**
    Moves the Endboss forward randomly within a defined range.
    */
    moveForward() {
        this.x -= Math.random() * (400 - 200) + 200;
    }

    /**
    Triggers the behavior for moving the Endboss back to its original position.
    */
    moveRight() {
        this.isMovingBack = true;
        this.startMoveRight();
    }
    /**
    Begins the interval to move the Endboss back to the right towards its original x-coordinate.
    */
    startMoveRight() {
        this.moveInterval = setInterval(this.executeMoveRight.bind(this), 160);
    }
    /**
    Executes the movement to the right during the move interval and manages animation and audio.
    */
    executeMoveRight() {
        if (this.x < this.originalX) {
            this.x += this.speed;
            this.playAnimation(this.IMAGES_WALK);
            this.manageWalkAudio();
        } else {
            clearInterval(this.moveInterval);
            this.endMoveRight();
        }
    }

    /**
    Manages the walking audio playback, ensuring it plays and loops correctly if not muted.
    */
    manageWalkAudio() {
        if (this.walkAudio.paused) {
            this.walkAudio.loop = true;
            if(!this.world.isMuted) {
                this.walkAudio.play();
            }
        }
    }

    /**
    Ends the move to the right, stops walking audio, and resets animation to the alert state unless the Endboss is dying.
    */
    endMoveRight() {
        this.isMovingBack = false;
        if (!this.isDying) {
            this.playAnimation(this.IMAGES_ALERT);
        }
        this.walkAudio.pause();
        this.walkAudio.currentTime = 0;
    }

    attack() {
        this.attackInterval = setInterval(this.initiateAttack.bind(this), Math.random() * (3000 - 1000) + 1000);
    }
    /**
    Initiates the attack sequence if conditions are met, plays wing flapping audio, and executes the attack moves.
    */
    initiateAttack() {
        if (this.hadFirstContact && !this.isAttacking && !this.isMovingBack && !this.isDying) {
            this.isAttacking = true;
            setTimeout(() => {
                if(!this.world.isMuted) {
                    this.wingsAudio.play(); 
                }
            }, 1200);
            this.executeAttack();
        }
    }

    /**
    Executes the attack sequence, moving the Endboss forward at specific frames and animating the attack.
    */
    executeAttack() {
        let index = 0;
        const interval = setInterval(() => {
            if (index === 5) {
                this.moveForward();
            }
            if (index >= this.IMAGES_ATTACK.length) {
                clearInterval(interval);
                this.isAttacking = false;
                this.moveRight();
                this.wingsAudio.pause(); 
                this.wingsAudio.currentTime = 0;
            } else {
                this.loadImage(this.IMAGES_ATTACK[index]);
                index++;
            }
        }, 400);
    }

    /**
    Continuously checks for the first contact with the player character and manages animations based on Endboss state.
    */
    animate() {
        this.animateInterval = setInterval(this.checkFirstContact.bind(this), 160);
    }

    /**
    Checks if the player character has come into proximity with the Endboss for the first time and updates the game state accordingly.
    */
    checkFirstContact() {
        if (this.world && this.world.character && this.world.character.x > 1200) {
            this.hadFirstContact = true;
        
            if (!this.isAttacking && !this.isMovingBack && !this.isDying) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }
    }

    die() {
        this.stopActivities();
        this.playDeathAnimation();
    }

    /**
    Stops all ongoing activities and animations related to the Endboss.
    */
    stopActivities() {
        clearInterval(this.attackInterval);
        clearInterval(this.animateInterval);
        clearInterval(this.moveInterval);
        this.walkAudio.pause();
        this.walkAudio.currentTime = 0;
        this.wingsAudio.pause();
        this.wingsAudio.currentTime = 0;
    }

    /**
    Manages the sequence of death animations and schedules the removal of the Endboss from the game world.
    */
    playDeathAnimation() {
        let index = 0;
        const interval = setInterval(() => {
            if (index >= this.IMAGES_DEAD.length) {
                clearInterval(interval);
                setTimeout(() => {
                    this.removeFromWorld();
                }, 1500);
            } else {
                this.loadImage(this.IMAGES_DEAD[index]);
                index++;
            }
        }, 160);
    }
}
