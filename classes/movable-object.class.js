class MovableObject{
    x = 120;
    y = 140;
    img;
    height = 150;
    width = 200;
    imageCache = {};
    currentImage = 0;
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
        return this.y < 140;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
            arr.forEach((path) => {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;  
            });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
    }
    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x,this.y,this.height, this.width);
            ctx.stroke();
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