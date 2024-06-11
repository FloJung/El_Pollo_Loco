let canvas;
let world;
let keyboard = new Keyboard();
let globalMuteStatus = false;

/**
Initializes the game environment, setting up the canvas, the game world, and user interface controls.
*/
function init() {
    canvas = document.getElementById('canvas');
    if (world) {
        world.reset();
    }
    world = new World(canvas, keyboard);
    world.isMuted = globalMuteStatus; // Mute-Status wiederherstellen
    initMobileControls();
    initStartButton();
}

/**
Initializes the start button and defines its behavior when clicked, including resetting and starting the game.
*/
function initStartButton() {
    const startButton = document.getElementById('startGame');
    startButton.addEventListener('click', () => {
        globalMuteStatus = world.isMuted; // Mute-Status speichern
        if (world) {
            world.reset();
        }
        world = new World(canvas, keyboard);
        world.isMuted = globalMuteStatus; // Mute-Status wiederherstellen
        world.startGame();
    });
}

/**
Checks and adjusts the canvas size based on the device's orientation to optimize the display for landscape mode.
*/
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

/**
Checks the device orientation and displays orientation advice if necessary.
*/
function checkDeviceOrientation() {
    if (window.innerWidth < 720) {
    if (window.innerHeight > window.innerWidth) {
        document.getElementById('rotateDevice').style.display = 'flex';
        document.getElementById('rotateDeviceGif').style.display = 'flex';
    } else {
        document.getElementById('rotateDevice').style.display = 'none';
        document.getElementById('rotateDeviceGif').style.display = 'none';
    }
} else {
    document.getElementById('rotateDevice').style.display = 'none';
    document.getElementById('rotateDeviceGif').style.display = 'none';
}
}

window.addEventListener('resize', checkDeviceOrientation);
document.addEventListener('DOMContentLoaded', checkDeviceOrientation);



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


/**
Sets up touch controls for the game, linking HTML buttons to game actions.
*/
function initMobileControls() {
    const moveLeftButton = document.getElementById('moveLeft');
    const moveRightButton = document.getElementById('moveRight');
    const jumpButton = document.getElementById('jump');
    const throwButton = document.getElementById('throw');
    const startButton = document.getElementById('startGame');

    if (startButton) {
        startButton.addEventListener('touchstart', (e) => {
            
            if (world) {
                world.reset();
            }
            world = new World(canvas, keyboard);
            world.startGame();
        });

    }

    

    if (moveLeftButton) {
        moveLeftButton.addEventListener('touchstart', (e) => {
            
            keyboard.LEFT = true;
        });

        moveLeftButton.addEventListener('touchend', (e) => {
            
            keyboard.LEFT = false;
        });
    }

    if (moveRightButton) {
        moveRightButton.addEventListener('touchstart', (e) => {
           
            keyboard.RIGHT = true;
        });

        moveRightButton.addEventListener('touchend', (e) => {
           
            keyboard.RIGHT = false;
        });
    }

    if (jumpButton) {
        jumpButton.addEventListener('touchstart', (e) => {
           
            keyboard.UP = true;
        });

        jumpButton.addEventListener('touchend', (e) => {
            
            keyboard.UP = false;
        });
    }

    if (throwButton) {
        throwButton.addEventListener('touchstart', (e) => {
            
            keyboard.THROW = true;
        });

        throwButton.addEventListener('touchend', (e) => {
            
            keyboard.THROW = false;
        });
    }

    
    
}

window.addEventListener('load', init);
