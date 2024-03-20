class Character extends MovableObject{

    height = 200;
    width = 300;
    speed = 5;
    IMAGES_WARLKING = ['img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',];
    world;
    

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WARLKING);

        this.animate();
    }

    animate() {

            setInterval(() => {
                if(this.world.keyboard.RIGHT == true) {
                this.x += this.speed;
                this.otherDirection = false;
                }
                if(this.world.keyboard.LEFT == true) {
                    this.x -= this.speed;
                    this.otherDirection = true;
                    }
            },1000/60);

            setInterval(() => {
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                
                    

                    // Walk animation
                    let i = this.currentImage % this.IMAGES_WARLKING.length;
                    let path = this.IMAGES_WARLKING[i];
                    this.img = this.imageCache[path];
                    this.currentImage++
            }
            },150);
        
    }

    jump() {

    }
}