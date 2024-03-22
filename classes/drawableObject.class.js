class DrawableObject {
    img;
    imageCache = {};
    x = 120;
    y = 140;
    height = 150;
    width = 200;
    currentImage = 0;

    constructor() {
        
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

    drawSpecific(ctx, img, x, y, width, height) {
        ctx.drawImage(img, x, y, width, height);
    }
    
}