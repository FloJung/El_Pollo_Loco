class World {
    ctx;

    backgroundObjekts = [
        new BackgroundObjekt('img/5_background/layers/air.png', 0,),
        new BackgroundObjekt('img/5_background/layers/3_third_layer/1.png', 0,),
        new BackgroundObjekt('img/5_background/layers/2_second_layer/1.png', 0,),
        new BackgroundObjekt('img/5_background/layers/1_first_layer/1.png', 0,),
    ]

    canvas = new Character();
    character = new Character();
    enemies = [
                new Chicken(),
                new Chicken(),
                new Chicken(),
                ];
    clouds = [
            new Cloud(),
    ];

   


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjektToMap(this.backgroundObjekts);
        this.addToMap(this.character);
        
        this.addObjektToMap(this.clouds);
        this.addObjektToMap(this.enemies);
        


        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjektToMap(objekts) {
        objekts.forEach(o => {
            this.addToMap(o);
    });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.height, mo.width);
    }
}