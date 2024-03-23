class ThrowableObject extends MovableObject{
    speedY = 30;
    speedX = 20;
 
    IMAGES_BOTTLE = ['img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
                        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
                        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
                        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',];

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
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