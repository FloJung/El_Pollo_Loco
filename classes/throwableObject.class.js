class ThrowableObject extends MovableObject{
    speedY = 30;
    speedX = 20;
 
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.throw();
    }

    throw() {
        this.x;
        this.y;
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        },1000/60);
    }
}