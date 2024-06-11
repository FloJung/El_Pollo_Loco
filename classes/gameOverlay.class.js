class GameOverlay extends DrawableObject {
    IMAGE_START = [
        'img/9_intro_outro_screens/start/startscreen_2.png',
    ];

    IMAGE_OVER = [
        'img/9_intro_outro_screens/game_over/oh no you lost!.png',
        'img/9_intro_outro_screens/game_over/game over.png',
    ];
    IMAGE_RESET = [
        'img/5_background/first_half_background.png',
        'img/5_background/first_half_background.png',
        'img/5_background/first_half_background.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGE_START[0]);
        this.loadImages(this.IMAGE_OVER);
        this.loadImage(this.IMAGE_RESET[0]);
    }


    /**
    Loads a single image and sets it as the current image of the overlay.
    Overrides the loadImage method from DrawableObject to set the loaded image as the current display image.
    @param {string} path - The path to the image file.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
}
