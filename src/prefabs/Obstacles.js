//unused but saved for the future
class Obstacles extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeed = speed; 
    }

    create(){
        
    }
//rev space class
    update() {
        this.x -= this.moveSpeed;
        if(this.x <= 0 - this.width) {
            this.reset();
        }

        

        // if(Phaser.Input.Keyboard.JustDown(keySpace)){
        //     this.isFiring = true;
        //     this.sfxRocket.play();  // play sfx
        // }
    }

    reset(){
        this.x = game.config.width;
    }
}