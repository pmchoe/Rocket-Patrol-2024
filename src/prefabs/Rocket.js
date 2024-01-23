// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track rocket's firing status
        this.moveSpeed = 2;         // rocket speed in pixels/frame
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if(keyRIGHT.isDown && this.x <= Gamepad.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyFIRE)) {
            this.isFiring = true;
        }
        // if fired, move ship up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset ship on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        } 
    }
}