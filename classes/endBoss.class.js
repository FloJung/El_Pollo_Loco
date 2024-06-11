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
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    
    walkAudio = new Audio('audio/walking.mp3');
    wingsAudio = new Audio('audio/flappingWings.mp3');
    bossHurtAudio = new Audio('audio/bossHurt.mp3');

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
        this.loadImages(this.IMAGES_HURT);
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
        if (this.energy > 0) {
            this.playHurtAnimation();
        } else {
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
        if (this.isDying) return;
        const { targetX, originalY, peakY } = this.initializeJump();
        this.performJump(targetX, originalY, peakY);
    }

    /**
    Calculates and returns the parameters required for a jump, including the target x-coordinate,
    the original y-coordinate, and the peak y-coordinate of the jump.
    @returns {{targetX: number, originalY: number, peakY: number}} An object containing the calculated coordinates for the jump.
    */
    initializeJump() {
        const randomDistance = Math.floor(Math.random() * (500 - 300 + 1) + 300);
        const targetX = this.x - randomDistance;
        const randomHeight = Math.floor(Math.random() * (120 - 80 + 1) + 80);
        const originalY = this.y;
        const peakY = this.y - randomHeight;
        return { targetX, originalY, peakY };
    }

    /**
    Performs the jump animation, moving the character towards a target x-coordinate while simulating
    vertical movement to reach a peak y-coordinate and then returning to the original y-coordinate.
    @param {number} targetX - The target x-coordinate the character should move towards.
    @param {number} originalY - The original y-coordinate of the character before jumping.
    @param {number} peakY - The highest y-coordinate the character should reach during the jump.
    */
    performJump(targetX, originalY, peakY) {
        if (this.isDying) return;
        const movePerFrame = 20;
        let goingUp = true;
        const attackMoveInterval = setInterval(() => {
            this.updatePosition(targetX, movePerFrame, goingUp, peakY, originalY, attackMoveInterval);
        }, 20); 
    }

    /**
    Updates the position of the character each frame during the jump, moving horizontally towards the target x-coordinate
    @param {number} targetX - The target x-coordinate the character should reach.
    @param {number} movePerFrame - The horizontal movement per frame.
    @param {boolean} goingUp - Indicates whether the character is moving up towards the peak y-coordinate.
    @param {number} peakY - The peak y-coordinate the character should reach.
    @param {number} originalY - The y-coordinate to return to after reaching the peak.
    @param {number} attackMoveInterval - The interval ID of the ongoing jump animation, used for cleanup.
    */
    updatePosition(targetX, movePerFrame, goingUp, peakY, originalY, attackMoveInterval) {
        if (this.x > targetX) {
            this.x -= movePerFrame;
            goingUp = this.updateVerticalPosition(goingUp, movePerFrame, peakY, originalY);
        } else {
            this.endJump(attackMoveInterval, originalY);
        }
    }

    /**
    Adjusts the vertical position of the character during a jump, changing direction at the peak of the jump.
    @param {boolean} goingUp - Indicates whether the character is currently ascending.
    @param {number} movePerFrame - The vertical movement adjustment per frame.
    @param {number} peakY - The peak y-coordinate the character should reach.
    @param {number} originalY - The y-coordinate to return to after reaching the peak.
    @returns {boolean} The updated direction of vertical movement (true if still going up, false if descending).
    */
    updateVerticalPosition(goingUp, movePerFrame, peakY, originalY) {
        if (goingUp) {
            if (this.y > peakY) {
                this.y -= movePerFrame / 2;
            } else {
                goingUp = false;
            }
        } else {
            if (this.y < originalY) {
                this.y += movePerFrame / 2;
            }
        }
        return goingUp;
    }

    /**
    Completes the jump animation, stopping the movement interval and resetting the character's vertical position.
    @param {number} attackMoveInterval - The interval ID of the ongoing jump animation, used for cleanup.
    @param {number} originalY - The y-coordinate to reset to after the jump is completed.
    */
    endJump(attackMoveInterval, originalY) {
        clearInterval(attackMoveInterval);
        this.y = originalY;
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
        if (this.isDying) return;
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
            if(!world.isMuted) {
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
    Initiates the hurt animation sequence by calculating animation parameters and starting the animation.
    */
    playHurtAnimation() {
        if (this.isDying) return;
        const { frameInterval, animationInterval } = this.initializeHurtAnimation();
        this.performHurtAnimation(frameInterval, animationInterval);
    }

    /**
    Initializes parameters for the hurt animation, determining the interval between animation frames.
    @returns {{frameInterval: number, animationInterval: number}} An object containing the frame interval and an initially null reference for the animation interval.
    */
    initializeHurtAnimation() {
        if (this.isDying) return;
        const hurtAnimationLength = 1000;  // Dauer der Hurt-Animation in ms
        const frameInterval = hurtAnimationLength / this.IMAGES_HURT.length;  // Interval zwischen Frames
        return { frameInterval, animationInterval: null };
    }

    /**
    Performs the hurt animation, cycling through hurt images at calculated intervals.
    @param {number} frameInterval - The time interval (in milliseconds) between each frame of the hurt animation.
    @param {number} animationInterval - The identifier for the interval function, used to manage and eventually clear the interval.
    */
    performHurtAnimation(frameInterval, animationInterval) {
        let index = 0;
        animationInterval = setInterval(() => {
            this.animateHurtFrame(index, animationInterval);
            index++;
        }, frameInterval);
    }

    /**
    Animates a single frame of the hurt animation sequence. If the end of the image sequence is reached, it ends the animation.
    @param {number} index - The current index in the hurt image array.
    @param {number} animationInterval - The interval ID used to clear the interval once the animation is complete.
    */
    animateHurtFrame(index, animationInterval) {
        if (this.isDying) return;
        if (index < this.IMAGES_HURT.length) {
            this.playHurtSound();
            this.loadImage(this.IMAGES_HURT[index]);
        } else {
            this.finishHurtAnimation(animationInterval);
        }
    }

    /**
    Plays the hurt sound effect, unless the game is muted.
    */
    playHurtSound() {
        if (!this.world.isMuted) {
            this.bossHurtAudio.play();
        }
    }

    /**
    Completes the hurt animation sequence by clearing the animation interval and potentially returning to a default animation state.
    @param {number} animationInterval - The interval ID used to stop the hurt animation.
    */
    finishHurtAnimation(animationInterval) {
        clearInterval(animationInterval);
        if (!this.isDying) {
            this.playAnimation(this.IMAGES_ALERT);  // Zurück zur Alert-Animation, wenn nicht sterbend
        }
    }

    /**
    Initiates the attack sequence if conditions are met, plays wing flapping audio, and executes the attack moves.
    */
    initiateAttack() {
        if (this.hadFirstContact && !this.isAttacking && !this.isMovingBack && !this.isDying) {
            this.isAttacking = true;
            setTimeout(() => {
                if(!world.isMuted) {
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
        this.isDying = true;
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
                if(!this.world.isMuted) {
                    this.bossHurtAudio.play();
                }
                this.loadImage(this.IMAGES_DEAD[index]);
                index++;
            }
        }, 160);
    }
}
