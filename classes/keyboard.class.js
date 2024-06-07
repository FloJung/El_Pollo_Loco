class Keyboard {
    constructor() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.DOWN = false;
        this.SPACE = false;
        this.THROW = false;
        this.MUTE = false;
        
        this.registerKeyListeners();
        this.registerTouchListeners();
    }

    registerKeyListeners() {
        window.addEventListener("keydown", (event) => {
            this.updateKeyStatus(event.keyCode, true);
        });

        window.addEventListener("keyup", (event) => {
            this.updateKeyStatus(event.keyCode, false);
        });
    }

    updateKeyStatus(keyCode, isPressed) {
        switch (keyCode) {
            case 40: this.DOWN = isPressed; break;
            case 38: this.UP = isPressed; break;
            case 37: this.LEFT = isPressed; break;
            case 39: this.RIGHT = isPressed; break;
            case 32: this.SPACE = isPressed; break;
            case 68: this.THROW = isPressed; break;
        }
    }

    registerTouchListeners() {
        // Diese Methode implementiert ähnliche Logik für Touch-Events
        const controls = [
            { elementId: 'moveLeft', action: () => this.LEFT = true, endAction: () => this.LEFT = false },
            { elementId: 'moveRight', action: () => this.RIGHT = true, endAction: () => this.RIGHT = false },
            { elementId: 'jump', action: () => this.UP = true, endAction: () => this.UP = false },
            { elementId: 'throw', action: () => this.THROW = true, endAction: () => this.THROW = false },
            { elementId: 'startGame', action: () => this.SPACE = true, endAction: () => this.SPACE = false },
            { elementId: 'muteGame', action: () => this.MUTE = !this.MUTE }
        ];

        controls.forEach(control => {
            const element = document.getElementById(control.elementId);
            if (element) {
                element.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    control.action();
                });
                if (control.endAction) {
                    element.addEventListener('touchend', (e) => {
                        e.preventDefault();
                        control.endAction();
                    });
                }
            }
        });
    }
}