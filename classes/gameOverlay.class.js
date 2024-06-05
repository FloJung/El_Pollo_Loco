class GameOverlay extends DrawableObject {
    IMAGE_START = [
        'img/9_intro_outro_screens/start/startscreen_2.png',
    ];

    IMAGE_OVER = [
        'img/9_intro_outro_screens/game_over/oh no you lost!.png',
    ];
    IMAGE_RESET = [
        'img/5_background/first_half_background.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGE_START[0]);
        this.loadImages(this.IMAGE_OVER);
        this.loadImage(this.IMAGE_RESET[0]);
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
}
