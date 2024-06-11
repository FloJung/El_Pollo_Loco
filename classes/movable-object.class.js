class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    dead = false; 
    removed = false;
    isDying = false;

    offset = {
        top:0,
        bottom:0,
        left:20,
        right:20
    }

    constructor() {
        super();
    }

    /**
    Applies a hit to the object, reducing its energy and making it temporarily invulnerable
    */
    hit() {
        if (!this.invulnerable) {
            this.energy -= 5;
            if (this.energy <= 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
                this.invulnerable = true;
                setTimeout(() => {
                    this.invulnerable = false;
                }, 100); // 10ms Unverwundbarkeit
            }
        }
    }

    /**
    Applies gravitational effects to the object, altering its vertical speed and position over time.
    */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0 || this.isDying) { 
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
    Checks if the object is above the ground, which may vary based on the object type.
    @returns {boolean} True if the object is above the ground, false otherwise.
    */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 240;
        }
    }

    /**
    Moves the object to the right based on its speed attribute.
    */
    moveRight() {
        this.x += this.speed;
    }

    /**
    Moves the object to the left based on its speed attribute.
    */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
    Plays an animation sequence from a given array of image paths.
    @param {Array<string>} images - An array of image paths to animate.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++
    }

    /**
    Causes the object to jump, setting an upward vertical speed.
    */
    jump() {
        this.speedY = 30;
    }

    /**
    Checks if this object is colliding with another movable object.
    @param {MovableObject} mo - The other movable object.
    @returns {boolean} True if colliding, false otherwise.
    */
    isColliding(mo) {
        return (this.x + this.height - this.offset.right > mo.x + mo.offset.left &&
                this.y + this.width - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.offset.left < mo.x + mo.height - mo.offset.right &&
                this.y + this.offset.top < mo.y + mo.width - mo.offset.bottom);
    }
    
    
    /**
     * Determines if this object is landing on top of another object.
     * @param {MovableObject} mo - The other movable object.
     * @returns {boolean} True if landing on top, false otherwise.
     */
    isLandingOnTop(mo) {
        const bottomOfThis = this.y + this.width - this.offset.bottom;
        const topOfObject = mo.y + mo.offset.top;
        const isVerticalOverlap = bottomOfThis >= topOfObject && bottomOfThis <= topOfObject + mo.width;
        const isHorizontalOverlap = this.x + this.height - this.offset.right > mo.x + mo.offset.left &&
                                    this.x + this.offset.left < mo.x + mo.height - mo.offset.right;
    
        return this.speedY < 0 && isVerticalOverlap && isHorizontalOverlap;
    }
    
    
    
    /**
    Checks if the object has been hurt recently.
    @returns {boolean} True if the object was hurt less than a second ago, false otherwise.
    */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
    Checks if the object is dead, based on its energy level.
    @returns {boolean} True if energy is 0, false otherwise.
    */
    isDead() {
        return this.energy === 0;
    }

    /**
    Checks if the object is still alive, not yet marked as dead.
    @returns {boolean} True if not dead, false otherwise.
    */
    isAlive() {
        return !this.dead;
    }

    /**
    Reduces the energy of the object by a specified amount and handles the death if energy reaches zero.
    @param {number} amount - The amount of damage to inflict.
    */
    takeDamage(amount) {
        this.energy -= amount;
        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
        }
    }

    /**
    Handles the object's death process, logging its death and scheduling its removal from the game world.
    */
    die() {
        this.dead = true;
        setTimeout(() => {
            this.removeFromWorld();
        }, 1000);
    }

    /**
    Removes the object from the game world, logging the removal.
    */
    removeFromWorld() {
        this.removed = true;
    }

}