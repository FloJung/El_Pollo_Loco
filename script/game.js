let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    initMobileControls();
    initStartButton(); 
}

function initStartButton() {
    const startButton = document.getElementById('startGame');
    if (startButton) {
        startButton.addEventListener('click', () => {
            if (world) {
                world.reset();
            }
            world = new World(canvas, keyboard);
            world.startGame();
        });
    }
}
function checkOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        if (window.innerHeight < 480) {
            newHeight = window.innerHeight;
            document.getElementById('canvas').style.height = `${newHeight}px`;
        }
    }
    else {
        document.getElementById('canvas').style.height = `100%`;
    }
}

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.THROW = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.THROW = false;
    }
});

function initMobileControls() {
    const moveLeftButton = document.getElementById('moveLeft');
    const moveRightButton = document.getElementById('moveRight');
    const jumpButton = document.getElementById('jump');
    const throwButton = document.getElementById('throw');
    const startButton = document.getElementById('startGame');
    const muteButton = document.getElementById('muteGame');

    if (startButton) {
        startButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.SPACE = world.startGame();
        });

    }

    if (muteButton) {
        muteButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.MUTE = true;
        });

        moveLeftButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.MUTE = false;
        });
    }

    if (moveLeftButton) {
        moveLeftButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.LEFT = true;
        });

        moveLeftButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.LEFT = false;
        });
    }

    if (moveRightButton) {
        moveRightButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.RIGHT = true;
        });

        moveRightButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.RIGHT = false;
        });
    }

    if (jumpButton) {
        jumpButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.UP = true;
        });

        jumpButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.UP = false;
        });
    }

    if (throwButton) {
        throwButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.THROW = true;
        });

        throwButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.THROW = false;
        });
    }
}

window.addEventListener('load', init);
