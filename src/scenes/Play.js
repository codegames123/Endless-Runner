var addScore;
var highScore = 0; // tracks high score
class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.path = 'assets/';
        this.load.image('redApple', 'red_apple_core.png');
        this.load.image('redApple2', 'red_apple_core_3.png');
        this.load.image('stopSign', './assets/stop_sign.png');
        this.load.image('box', './assets/wooden_box.png');
        this.load.image('greenApple', 'apple_core_2.png');
        this.load.image('background', 'Endless_Runner_Background.png');
        this.load.image('ground','Ground_tile.png');
        this.load.image('trash','trash_can.png');
        this.load.image('score','Score-display.png');
        this.load.image('highS','highS-display.png');
        this.load.atlas('player', 'baby_car_spritesheet.png', 'baby_car_sprite.json'); // stroller
        this.load.atlas('baby', 'da_baby.png', 'da_baby_spritesheet.json'); // baby
        this.load.atlas('greenAppleSpriteS', 'greenAppleSprite.png', 'greenAppleSprite.json');
        //this.load.atlas('redAppleSpriteS', 'red_apple_core_sprite_sheet.png', 'red_apple_core.json');
        this.load.atlas('babyStun', 'baby_stun.png', 'baby_stun_spritesheet.json');
        this.load.atlas('beerBottleS', 'beer_bottle_spritesheet.png', 'beer_bottle.json');
        this.load.atlas('bottleS', 'bottle_spritesheet.png', 'bottle.json');
        this.load.atlas('bananaS', 'banana_spritesheet.png', 'banana.json');
        this.load.atlas('jumpAnim', 'baby_car_tilt.png', 'baby_car_tilt_spritesheet.json');
        
        
    }
    create() { 
        // variables and settings
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 2;
        this.SCROLL_SPEED = 4;
        this.physics.world.gravity.y = 2600;
        
        //sets platforms
        let platforms1 = this.physics.add.image(game.config.width/2 + 420, game.config.height/2 + 228, 'ground').setScale(2).setSize(40, 20).setOffset(-5, 30);
        let platforms2 = this.physics.add.image(game.config.width/2 + 420, game.config.height/2 + 228, 'ground').setScale(2).setSize(20, 30).setOffset(5, 5); //setSize(width, height), setOffset(left-/right+,up-/down+)
        platforms1.setImmovable(true);
        platforms1.body.allowGravity = false;
        platforms2.setImmovable(true);
        platforms2.body.allowGravity = false;

        this.background = this.add.tileSprite(game.config.width/2, game.config.height/2, game.config.width, game.config.height + 321, 'background'); // (position-x, position-y, width, height, 'background name')

        let song = this.sound.add('baby_song', {loop: true}); // initilizes background music
        song.play(); //plays song

        let selectSound = this.sound.add('selectSound', {loop: false}); // initilizes select sound
        let gameOverSound = this.sound.add('game_overSound', {loop: false, volume: 0.1});//initializes game over sound
        let jumpSound = this.sound.add('jumpSound', {loop: false}); // initializes jump sound
        let appleSounds = this.sound.add('appleSound', {loop: false}); // initlizes apple hit sound
        let canSound = this.sound.add('canSound', {loop: false}); // initilizes can hit sound
        let bananaSound = this.sound.add('bananaSound', {loop: false}); // initilizes banana hit sound
        let throwSound = this.sound.add('throwSound', {loop: false}); // initilizes throw sound
        let beerBreak = this.sound.add('beerBreak', {loop: false}); // initilizes beer break sound
        let stopSound = this.sound.add('stopSound', {loop: false}); // initilizes stop sign hit sound
        let crateSound = this.sound.add('crateSound',{loop: false}); // initilizes crate hit sound
        this.speedUp = this.sound.add('speedUp',{loop: false}); // initilizes crate hit sound

        //creates animations
        this.anims.create({ 
            key: 'jump', 
            frames: this.anims.generateFrameNames('jumpAnim', {      
                prefix: 'jump',
                start: 1,
                end: 5,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 15,
            repeat: 0 
        });
        this.anims.create({ 
            key: 'babyAnim', 
            frames: this.anims.generateFrameNames('baby', {      
                prefix: 'baby',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 5,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'babycar', 
            frames: this.anims.generateFrameNames('player', {      
                prefix: 'babycar',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 5,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'babystun', 
            frames: this.anims.generateFrameNames('babyStun', {      
                prefix: 'babystun',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 2,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'applespin', 
            frames: this.anims.generateFrameNames('greenAppleSpriteS', {      
                prefix: 'applespin',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 5,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'beerbottleSpin', 
            frames: this.anims.generateFrameNames('beerBottleS', {      
                prefix: 'beerbottle',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 5,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'bottleSpin', 
            frames: this.anims.generateFrameNames('bottleS', {      
                prefix: 'bottle',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 5,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'bananaSpin', 
            frames: this.anims.generateFrameNames('bananaS', {      
                prefix: 'banana',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 5,
            repeat: -1 
        });

        //initilizes keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        let projectile = this.physics.add.group();

        //this.stopSign = new Obstacles(this,game.config.width/2 , game.config.height/2 - 17, 'stopSign', 0 , 6).setOrigin(0, 0);
        //projectile.getBounds();
        // projectile = this.physics.add.group({
        //     key: 'projectile',
        //     repeat: 11,
        //     //setXY: { x: game.config.width + (game.config.height / 15) * 6, y: (game.config.height/15) * 4},
        //     //setXY: { x: game.config.width/2, y: game.config.height/2},
        //     setXY: { x: 12, y: 0, stepX: 70 }
        // });
        
        //initilize score;
        this.pScore = 0;
        //this.pointText = this.add.text(game.config.width/2 + 200,game.config.height/2 - 270, 'Points: ', textConfig);
        
        //initilizes and displays high score
        this.add.image(game.config.width/2 -400,game.config.height/2 - 225,'highS').setScale(0.7);
        this.highScoreMid = this.add.text(game.config.width/2 - 415,game.config.height/2 - 220, highScore, {fontFamily: 'Courier',fontSize: '25px',color: 'black',align: 'left'});
        this.add.image(game.config.width/2 + 400,game.config.height/2 - 225, 'score').setScale(0.7);
        this.scoreLeft = this.add.text(game.config.width/2 +380,game.config.height/2 - 220,  this.pScore, {fontFamily: 'Courier',fontSize: '25px',color: 'black',align: 'left'});
        //this.add.text(game.config.width/2 +260,game.config.height/2 - 220, 'Best:', {fontFamily: 'Courier',fontSize: '18px',color: 'black',align: 'left'});
       
        
        // put another tile sprite above the ground tiles
         this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'ground').setOrigin(0);

        this.baby = this.physics.add.sprite(game.config.width/9 + 20, game.config.height/2-35, 'baby').setScale(0.38).setSize(220, 255).setOffset(25, 50);
        this.stroller = this.physics.add.sprite(game.config.width/9, game.config.height/2-30, 'player').setScale(0.38);

        //this.sprite = new Sprite(this, game.config.width/9 - 55, game.config.height/2+80, 'baby').setOrigin(0, 0).setScale(0.38).setSize(40, 40);//setSize(width, height)
        this.stroller.play('babycar');
        this.baby.play('babyAnim');
        
        this.stroller.setCollideWorldBounds(true);
        this.baby.setCollideWorldBounds(true);

        //this.stroller.play('jump');
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        
        // add physics collider
        this.physics.add.collider(this.stroller, platforms1);
        this.physics.add.collider(this.baby, platforms2);

        //Game over flag
        this.gameOver = false;
        // spawns projectile every 2.5-3 seconds and if collides with player displays Game Over and ends game song
        this.time.addEvent({
            delay: this.randomTimer(), callback: () => {
                // uses random number from 0-6 to spawn projectiles
                let randomSpawn = Math.floor(Math.random() * 2);
                let ranNumber = Math.floor(Math.random() * 7);

                if (!this.gameOver && ranNumber == 0) {
                    throwSound.play();
                    if (randomSpawn == 0) {
                        projectile = this.physics.add.sprite(game.config.width / 2 + 270, game.config.height / 2 + 280, 'redApple').setScale(0.8); // red apple from ground
                    } else if (randomSpawn == 1) {
                        projectile = this.physics.add.sprite(game.config.width / 2 + 270, game.config.height / 2 + 280, 'redApple2').setScale(0.8);
                    }
                    projectile.body.gravity.y = -2000;
                    projectile.body.velocity.x = -330;
                    projectile.body.velocity.y = -630;
                    
                }
                if (!this.gameOver && ranNumber == 1) { // can bottle randomly spawn from right side
                    projectile = this.physics.add.sprite(game.config.width / 2 + 505, game.config.height / 2 + (Math.floor(Math.random() * (220 - (-80) + 1)) - 80), 'bottleS').setScale(0.8);// bottom // 550 // from top -250 to bottom 250
                    projectile.play('bottleSpin');
                    projectile.body.gravity.x = -450;
                    console.log(this.pScore);

                    //goes faster after every score of 500 with max speed after 2000
                    if (this.pScore < 500) {
                        projectile.body.gravity.x += 0;
                    } else if (this.pScore < 1000) {
                        projectile.body.gravity.x += -300;
                    } else if (this.pScore < 1500) {
                        projectile.body.gravity.x += -600;
                    } else
                        projectile.body.gravity.x += -700;
                    console.log(projectile.body.gravity.x)
                    projectile.body.gravity.y = -2600;
                }
                if (!this.gameOver && ranNumber == 2) { // projectiles from the ground
                    throwSound.play();
                    if (randomSpawn == 0) {
                        projectile = this.physics.add.sprite(game.config.width / 2 + 450, game.config.height / 2 + 280, 'beerBottleS').setScale(0.8); // spawns beer bottle
                        projectile.play('beerbottleSpin');
                    } else if (randomSpawn == 1) {
                        projectile = this.physics.add.sprite(game.config.width / 2 + 450, game.config.height / 2 + 280, 'bananaS').setScale(0.8); // spawns banana instead
                        projectile.play('bananaSpin');
                    } else if (randomSpawn == 2) {
                        projectile = this.physics.add.sprite(game.config.width / 2 + 450, game.config.height / 2 + 280, 'greenAppleSpriteS').setScale(0.8); // spawns banana instead
                        projectile.play('applespin');
                    }
                    projectile.body.gravity.y = -2000;
                    projectile.body.velocity.x = -345;
                    projectile.body.velocity.y = -730;
                }
                if (!this.gameOver && ranNumber == 3) { // projectile from top right
                    throwSound.play();
                    projectile = this.physics.add.sprite(game.config.width / 2 + 900, game.config.height / 2 - 100, 'greenAppleSpriteS').setScale(0.8);
                    projectile.play('applespin');
                    projectile.body.gravity.y = -2400;
                    projectile.body.velocity.x = -800;
                }
                if (!this.gameOver && ranNumber == 4) { // stop sign projectile
                    projectile = this.physics.add.sprite(game.config.width / 2 + 900, game.config.height / 2 + 110, 'stopSign').setScale(1).setSize(100, 200).setOffset(80, 50);
                    // - 450 before speed up, -750 after speed up
                    projectile.body.gravity.x = -450;

                    //goes faster after every score of 500 with max speed after 2000
                    if (this.pScore < 500) {
                        projectile.body.gravity.x += 0;
                    } else if (this.pScore < 1000) {
                        projectile.body.gravity.x += -300;
                    } else if (this.pScore < 1500) {
                        projectile.body.gravity.x += -600;
                    } else
                        projectile.body.gravity.x += -700;
                    projectile.body.gravity.y = -2600;
                }
                if (!this.gameOver && ranNumber == 5) { // box projectile
                    projectile = this.physics.add.sprite(game.config.width / 2 + 900, game.config.height / 2 + 186, 'box').setScale(0.6).setSize(170, 200).setOffset(50, 50); //setSize(width, height), setOffset(left-/right+,up-/down+)
                    // - 450 before speed up, -750 after speed up
                    projectile.body.gravity.x = -450;

                    //goes faster after every score of 500 with max speed after 2000
                    if (this.pScore < 500) {
                        projectile.body.gravity.x += 0;
                    } else if (this.pScore < 1000) {
                        projectile.body.gravity.x += -300;
                    } else if (this.pScore < 1500) {
                        projectile.body.gravity.x += -600;
                    } else
                        projectile.body.gravity.x += -700;
                    projectile.body.gravity.y = -2600;
                }
                if (!this.gameOver && ranNumber == 6) { // box projectile
                    projectile = this.physics.add.sprite(game.config.width / 2 + 900, game.config.height / 2 + 166, 'trash').setScale(0.6).setSize(170, 200).setOffset(50, 50); //setSize(width, height), setOffset(left-/right+,up-/down+)
                    // - 450 before speed up, -750 after speed up
                    projectile.body.gravity.x = -450;

                    //goes faster after every score of 500 with max speed after 2000
                    if (this.pScore < 500) {
                        projectile.body.gravity.x += 0;
                    } else if (this.pScore < 1000) {
                        projectile.body.gravity.x += -300;
                    } else if (this.pScore < 1500) {
                        projectile.body.gravity.x += -600;
                    } else
                        projectile.body.gravity.x += -700;
                    projectile.body.gravity.y = -2600;
                }

                this.physics.add.overlap(this.baby, projectile, () => { // overlapping function
                    //plays a particular collision sound
                    if (ranNumber == 0) {
                        appleSounds.play();
                    }
                    if (ranNumber == 1) {
                        canSound.play();
                    }
                    if (ranNumber == 2) {
                        if (randomSpawn == 0) {
                            beerBreak.play();
                        } else if (randomSpawn == 1) {
                            bananaSound.play();
                        } else if (randomSpawn == 2) {
                            appleSounds.play();
                        }
                    }
                    if (ranNumber == 3) {
                        appleSounds.play();
                    }
                    if(ranNumber == 4) {
                        stopSound.play();
                    }
                    if(ranNumber == 5) {
                        crateSound.play();
                    }

                    gameOverSound.play(); // plays gameover sound
                    this.baby.stop('babyAnim');
                    this.baby.play('babystun');
                    projectile.destroy();
                    this.gameOver = true;
                    this.add.text(game.config.width / 2, game.config.height / 2, 'Game Over!', { fontSize: 50, color: 'orange' }).setOrigin(0.5);
                    const clickRestart = this.add.text(game.config.width / 2 - 80, game.config.height / 2 + 40, 'Restart?', { fontFamily: 'Cursive', fontSize: 30, color: '#52F0F7' }).setInteractive()
                        .on('pointerdown', () => {
                            selectSound.play();
                            this.scene.restart();
                        })
                        .on('pointerover', () => {
                            clickRestart.setStyle({ fill: 'yellow' });
                        })
                        .on('pointerout', () => {
                            clickRestart.setStyle({ fill: '#52F0F7' })
                        });
                    const clickMenu = this.add.text(game.config.width / 2 - 80, game.config.height / 2 + 90, 'Menu', { fontFamily: 'Cursive',fontSize: 30, color: '#52F0F7' }).setInteractive()
                        .on('pointerdown', () => {
                            selectSound.play();
                            this.scene.start('menuScene');
                        })
                        .on('pointerover', () => {
                            clickMenu.setStyle({ fill: 'green' });
                        })
                        .on('pointerout', () => {
                            clickMenu.setStyle({ fill: '#52F0F7' })
                        });
                    song.stop(); //stop music when game over

                    this.stroller.anims.stop();
                }, null, this);

            }, callbackScope: this, loop: true

        });
        addScore = this.time.addEvent({ delay: 100, callback: this.addToScore, callbackScope: this, loop: true }); //calls addToScore every second
        
    }

    //adds score by 1 every millisecond
    addToScore() {
        if(!this.gameOver) //if game over, stops points from adding
            this.pScore += 1;
        if(this.pScore % 500 == 0 && this.pScore < 2000) { // adds to background speed every score of 500 max 2000
            this.speedUp.play(); //plays sound after every speed up
            this.SCROLL_SPEED += 1.5;
        }
        if(this.pScore > highScore)
            highScore += 1; // adds to high score
    }

    // spawns items either 2.5 or 3 seconds
    randomTimer() { 
        let num = Math.floor(Math.random() * 3);
        if(num == 0) {
            return 2500; 
        }else {
            return 3000; 
        }
    }

    update() {
        // makes background scroll diagonally (tweak for more "speed")
        if (!this.gameOver) {
            this.background.tilePositionX += this.SCROLL_SPEED;
            this.groundScroll.tilePositionX += this.SCROLL_SPEED;
        }

		// check if player is grounded
	    this.baby.isGrounded = this.baby.body.touching.down;
	    // if so, we have jumps to spare
	    if(!this.gameOver && this.baby.isGrounded ) {
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    }
        // allow steady velocity change up to a certain key down duration
	    if(!this.gameOver && this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.space, 150)) {
             
            this.baby.body.velocity.y = this.JUMP_VELOCITY;
            
            if(this.jumps> 1) { // leave stroller behind on double jump
                this.stroller.body.velocity.y = this.JUMP_VELOCITY;
            }
	        this.jumping = true;
            
	    } 
        // finally, letting go of the UP key subtracts a jump
	    if(!this.gameOver && this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.space) ) {
	    	this.stroller.play('babycar');
            this.jumps--;
	    	this.jumping = false;
	    }
        if(!this.gameOver && Phaser.Input.Keyboard.JustDown(cursors.space) && this.jumping) {
            if(this.jumps> 1)
                this.stroller.play('jump');
            this.sound.play('jumpSound', {volume: 0.3});
        }
        this.scoreLeft.text = this.pScore; // updates score +10
        this.highScoreMid.text = highScore; // updates high score
    }
}
