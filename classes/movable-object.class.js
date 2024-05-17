class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

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
            return this.y < 140;
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
        const bottomOfThis = this.y + this.width;  // Untere Kante des Charakters
        const topOfObject = mo.y;  
        const isVerticalOverlap = bottomOfThis >= topOfObject && bottomOfThis <= topOfObject + mo.width;
        const isHorizontalOverlap = this.x + this.height > mo.x && this.x < mo.x + mo.height;
    
        // console.log({
        //     'Char Bottom': bottomOfThis,
        //     'Obj Top': topOfObject,
        //     'Obj Bottom': topOfObject + mo.height,
        //     'Falling': this.speedY < 0,
        //     'SpeedY': this.speedY,
        //     'Vertical Overlap': isVerticalOverlap,
        //     'Horizontal Overlap': isHorizontalOverlap
        // });
    
        return this.speedY < 0 && isVerticalOverlap && isHorizontalOverlap;
    }
    
    

    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0; 
        }else {
            this.lastHit = new Date().getTime();
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

}