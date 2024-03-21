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
    walkingAudio = new Audio('audio/walking.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WARLKING);

        this.animate();
    }

    animate() {

            setInterval(() => {
                this.walkingAudio.pause();
                if(this.world.keyboard.RIGHT && this.x< this.world.level.levelEnd_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walkingAudio.play();
                
                }
                if(this.world.keyboard.LEFT && this.x > 0) {
                    this.x -= this.speed;
                    this.otherDirection = true;
                    this.walkingAudio.play();
                }

                this.world.camera_x = -this.x + 100;

            },1000/60);

            setInterval(() => {
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {  
                    // Walk animation
                   this.playAnimation(this.IMAGES_WARLKING);
            }
            },150);
        
    }

    jump() {

    }
}