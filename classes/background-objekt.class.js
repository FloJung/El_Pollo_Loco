class BackgroundObjekt extends MovableObject {
    width = 720;
    height= 720;
    constructor(imagePath, x) {
        super().loadImage(imagePath, x);

        this.y = this.height - 926;
        this.x = x;
    };
}