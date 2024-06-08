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
    /**
    Loads an image from a specified path and sets it as the object's main image.
    @param {string} path - The path to the image file.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }     

    /**
    Loads multiple images from an array of paths into the imageCache for later use.
    @param {Array<string>} arr - An array of image file paths.
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;  
        });
    }
    /**
    Draws the object's main image at its current position on the provided canvas context.
    @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
    }

    drawFrame(ctx) {
        // if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Coin || this instanceof Bottle) {
        //     ctx.beginPath();
        //     ctx.lineWidth = '3';
        //     ctx.strokeStyle = 'blue';
        //     ctx.rect(this.x,this.y,this.height, this.width);
        //     ctx.stroke();
        // }
    }
    /**
    Draws a specific image at a specified position and size on the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {Image} img - The image to draw.
     * @param {number} x - The x coordinate on the canvas.
     * @param {number} y - The y coordinate on the canvas.
     * @param {number} width - The width of the image to draw.
     * @param {number} height - The height of the image to draw.
    */
    drawSpecific(ctx, img, x, y, width, height) {
        ctx.drawImage(img, x, y, width, height);
    }
     
}