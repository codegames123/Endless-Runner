//unused but saved for the future
class Sprite extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    this.moveSpeed = 5;
  }

  update() {
    //this.baby.isGrounded = this.baby.body.touching.down;
    if (Phaser.Input.Keyboard.DownDuration(keySpace, 150)) {
      this.isJumping = true;
    }
    if (this.isJumping && this.y >= game.config.height / 15 + (game.config.height / 15) / 3) {
      this.y -= this.moveSpeed;
    }
    if (Phaser.Input.Keyboard.UpDuration(keySpace, 150)) {
      this.isJumping = false;
      this.y += 5;
    }
    // if(!this.isJumping && this.baby.isGrounded) {
    //   this.y = game.config.width/2 -140;
    // }



    // this.baby.isGrounded = this.baby.body.touching.down;
    // if (!this.gameOver && this.baby.isGrounded) {
    //   //this.stroller.anims.play('walk', true);

    //   //this.stroller.stop('jump');
    //   //this.stroller.play('babycar');
    //   this.jumps = this.MAX_JUMPS;
    //   this.jumping = false;
    // }
    // // allow steady velocity change up to a certain key down duration
    // if (!this.gameOver && this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(keySpace, 150)) {

    //   this.body.velocity.y = this.JUMP_VELOCITY;

    //   //this.stroller.stop('jump');
    //   this.jumping = true;

    // }
    // // finally, letting go of the UP key subtracts a jump
    // if (!this.gameOver && this.jumping && Phaser.Input.Keyboard.UpDuration(keySpace)) {
    //   this.stroller.play('babycar');
    //   this.jumps--;
    //   this.jumping = false;
    // }

  }

}