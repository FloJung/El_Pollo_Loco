class ThrowableObject extends MovableObject{
    speedY = 30;
    speedX = 20;
 
    IMAGES_BOTTLE = ['img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
                        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
                        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
                        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',];

    constructor(x, y) {
        super().loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.animate();
        this.throw();
    }

    /**
    Initiates an animation loop for the throwable object, cycling through images to simulate rotation or motion.
    */
    animate() {
        setInterval(() =>{
            this.playAnimation(this.IMAGES_BOTTLE);    
        },120);
    }

    /**
    Initiates the throwing motion of the object, applying gravity and horizontal motion.
    */
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