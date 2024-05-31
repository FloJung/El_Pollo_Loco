class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    THROW = false;

    constructor() {
        this.bindBtnPressEvents();
    }

    bindBtnPressEvents() {
        document.getElementById('moveLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('moveLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('moveRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('moveRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('jump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true;
        });

        document.getElementById('jump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.UP = false;
        });

        document.getElementById('throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.THROW = true;
        });

        document.getElementById('throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.THROW = false;
        });
    }
}