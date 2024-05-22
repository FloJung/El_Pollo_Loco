class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    dead = false; 
    removed = false;

    constructor() {
        super();
    }

    applyGravity() {

        setInterval(() =>{
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        },1000/25)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }else {
            return this.y < 240;
        }  
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++
    }

    jump() {
        this.speedY = 30;
    }

    isColliding(mo) {
        return  this.x + this.height > mo.x &&
            this.y + this.width > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.width
    }

   
    
    isLandingOnTop(mo) {
        const bottomOfThis = this.y + this.width;  
        const topOfObject = mo.y;  
        const isVerticalOverlap = bottomOfThis >= topOfObject && bottomOfThis <= topOfObject + mo.width;
        const isHorizontalOverlap = this.x + this.height > mo.x && this.x < mo.x + mo.height + 40;
    
        return this.speedY < 0 && isVerticalOverlap && isHorizontalOverlap;
    }
    
    

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
                }, 100); // 1 Sekunde Unverwundbarkeit
            }
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    isDead() {
        return this.energy === 0;
    }

    isAlive() {
        return !this.dead;
    }

    takeDamage(amount) {
        this.energy -= amount;
        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
        }
    }

    die() {
        console.log(`${this.constructor.name} is dead!`);
        this.dead = true;
        setTimeout(() => {
            this.removeFromWorld();
        }, 1000);
    }

    removeFromWorld() {
        console.log(`${this.constructor.name} is removed from world!`);
        this.removed = true;
        console.log(this.removed);

    }
}