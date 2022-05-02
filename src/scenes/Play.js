var addScore;
var platforms1
var platforms2
//var rock;
var highScore = 0;
//var isOutOfBound = true;
class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.path = 'assets/';
        //this.load.atlas('sprite', 'rocket1.png', 'kenny_sheet.json'); //atlas temporary example test. will change everything later
        //this.load.spritesheet('player', 'baby_car_3.png',{ frameWidth: 350, frameHeight: 345, startFrame: 0, endFrame: 7 }); // stroller
        //this.load.spritesheet('baby', 'baby_4.png',{ frameWidth: 295, frameHeight: 300, startFrame: 0, endFrame: 7 }); // baby
        this.load.atlas('player', 'baby_car_spritesheet.png', 'baby_car_sprite.json'); // stroller
        this.load.atlas('baby', 'da_baby.png', 'da_baby_spritesheet.json'); // baby
        this.load.image('redApple', 'red_apple_core.png');
        this.load.image('redApple2', 'red_apple_core_3.png');
        this.load.atlas('greenAppleSpriteS', 'greenAppleSprite.png', 'greenAppleSprite.json');
        //this.load.atlas('redAppleSpriteS', 'red_apple_core_sprite_sheet.png', 'red_apple_core.json');
        this.load.atlas('babyStun', 'baby_stun.png', 'baby_stun_spritesheet.json');
        this.load.atlas('beerBottleS', 'beer_bottle_spritesheet.png', 'beer_bottle.json');
        this.load.atlas('bottleS', 'bottle_spritesheet.png', 'bottle.json');
        this.load.atlas('bananaS', 'banana_spritesheet.png', 'banana.json');
        //this.load.spritesheet('jumpAnim', 'baby_car_tilt1.png',{frameWidth: };
        this.load.atlas('jumpAnim', 'baby_car_tilt.png', 'baby_car_tilt_spritesheet.json');
        this.load.image('greenApple', 'apple_core_2.png');
        this.load.image('background', 'Endless_Runner_Background.png');
        this.load.image('ground','ground3.png');
        
    }
    create() { 
        // variables and settings
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 2;
        this.SCROLL_SPEED = 4;
        currentScene = 3;
        this.physics.world.gravity.y = 2600;

        this.background = this.add.tileSprite(game.config.width/2, game.config.height/2, game.config.width, game.config.height + 300, 'background');

        platforms1 = this.physics.add.image(game.config.width/2 + 420, game.config.height/2 + 228, 'ground').setScale(2).setSize(40, 20).setOffset(30, 8);
        platforms2 = this.physics.add.image(game.config.width/2 + 420, game.config.height/2 + 228, 'ground').setScale(2).setSize(20, 30).setOffset(40, -9); //setSize(width, height), setOffset(left/right,up/down)
        //platforms.create(game.config.width/2, game.config.height/2 + 228, 'ground').setScale(2) 
        platforms1.setImmovable(true);
        platforms1.body.allowGravity = false;

        platforms2.setImmovable(true);
        platforms2.body.allowGravity = false;
        
        let song = this.sound.add('baby_song', {loop: true}); // initilizes background music
        song.play(); //plays song

        let selectSound = this.sound.add('selectSound', {loop: false}); // initilizes select sound
        let gameOverSound = this.sound.add('game_overSound', {loop: false, volume: 0.1});//initializes game over sound
        let jumpSound = this.sound.add('jumpSound', {loop: false}); // initializes jump sound
        let appleSounds = this.sound.add('appleSound', {loop: false});
        let canSound = this.sound.add('canSound', {loop: false});
        let bananaSound = this.sound.add('bananaSound', {loop: false});
        let throwSound = this.sound.add('throwSound', {loop: false});

        //creates animations
        this.anims.create({ 
            key: 'jump', 
            frames: this.anims.generateFrameNames('jumpAnim', {      
                prefix: 'jump',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4 
            }), 
            frameRate: 10,
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
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        //rock = new Rock(this, game.config.width + (game.config.height / 15) * 6, (game.config.height/15) * 4, 'rock', 0).setOrigin(0, 0);
        // rock = this.physics.add.sprite(game.config.width/2 + 600,game.config.height/2 - 170,'rock');
        // rock.body.velocity.x = -1900;
        let rock = this.physics.add.group();
        //rock.getBounds();
        // rock = this.physics.add.group({
        //     key: 'rock',
        //     repeat: 11,
        //     //setXY: { x: game.config.width + (game.config.height / 15) * 6, y: (game.config.height/15) * 4},
        //     //setXY: { x: game.config.width/2, y: game.config.height/2},
        //     setXY: { x: 12, y: 0, stepX: 70 }
        // });
        
        //Text formats
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '29px',
            color: 'black',
            align: 'left',
            padding: {
                top: 10,
                bottom: 5,
            },
            fixedWidth: 200
        }

        //initilize score;
        this.pScore = 0;
        //this.pointText = this.add.text(game.config.width/2 + 200,game.config.height/2 - 270, 'Points: ', textConfig);
        this.scoreLeft = this.add.text(game.config.width/2 + 300,game.config.height/2 - 270,  this.pScore, textConfig);
        //initilizes and displays high score
        this.highScoreMid = this.add.text(game.config.width/2 + 320,game.config.height/2 - 220, highScore, {fontFamily: 'Courier',fontSize: '18px',color: 'black',align: 'left'});
        this.add.text(game.config.width/2 +260,game.config.height/2 - 220, 'Best:', {fontFamily: 'Courier',fontSize: '18px',color: 'black',align: 'left'});
        
        // put another tile sprite above the ground tiles
       // this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'ground').setSize(24, 20).setOffset(8, 12).setOrigin(0);

        this.baby = this.physics.add.sprite(game.config.width/9 + 15, game.config.height/2-30, 'baby').setScale(0.38).setSize(220, 255).setOffset(30, 50);
        this.player = this.physics.add.sprite(game.config.width/9, game.config.height/2-30, 'player').setScale(0.38);
        this.player.play('babycar');
        this.baby.play('babyAnim');
        
        this.player.setCollideWorldBounds(true);
        this.baby.setCollideWorldBounds(true);

        //this.player.play('jump');
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        
        // add physics collider
        this.physics.add.collider(this.player, platforms1);
        this.physics.add.collider(this.baby, platforms2);

        //Game over flag
        this.gameOver = false;
        this.isSpawn = false;
        // spawns projectile every 1.5-2 seconds and if collides with player displays Game Over and ends game song
        this.time.addEvent({
            delay: this.randomTimer(), callback: () => {
                //let isOutOfBound = false;
                
                let randomSpawn = Math.floor(Math.random() * 2);
                let ranNumber = Math.floor(Math.random() * 4);
                // uses random number from 0-3 to spawn projectiles
                if (!this.gameOver && ranNumber == 0) {
                    throwSound.play();
                    if (randomSpawn == 0) {
                        rock = this.physics.add.sprite(game.config.width / 2 + 270, game.config.height / 2 + 280, 'redApple').setScale(0.8); // red apple from ground
                    } else if (randomSpawn == 1) {
                        rock = this.physics.add.sprite(game.config.width / 2 + 270, game.config.height / 2 + 280, 'redApple2').setScale(0.8);
                    }
                    //rock.body.gravity.x = -1000;
                    rock.body.gravity.y = -2000;
                    rock.body.velocity.x = -380;
                    rock.body.velocity.y = -630;
                    this.isSpawn = true;
                    //isOutOfBound = Phaser.Geom.Rectangle.Overlaps(this.physics.world.bounds, rock.getBounds()); // checks if item is in the screen
                    //console.log(isOutOfBound);
                }
                if (!this.gameOver && ranNumber == 1) { // projectile from the right side
                    rock = this.physics.add.sprite(game.config.width / 2 + 505, game.config.height / 2 + (Math.floor(Math.random() * (250 - (-80) + 1)) - 80), 'bottleS').setScale(0.8);// bottom // 550 // from top -250 to bottom 250
                    rock.play('bottleSpin');
                    rock.body.gravity.x = -350;//-470 -300
                    rock.body.gravity.y = -2600;
                    this.isSpawn = true;
                }
                if (!this.gameOver && ranNumber == 2) { // projectiles from the ground
                    throwSound.play();
                    if (randomSpawn == 0) {
                        rock = this.physics.add.sprite(game.config.width / 2 + 450, game.config.height / 2 + 280, 'beerBottleS').setScale(0.8); // spawns beer bottle
                        rock.play('beerbottleSpin');
                    } else if (randomSpawn == 1) {
                        rock = this.physics.add.sprite(game.config.width / 2 + 450, game.config.height / 2 + 280, 'bananaS').setScale(0.8); // spawns banana instead
                        rock.play('bananaSpin');
                    } else if (randomSpawn == 2) {
                        rock = this.physics.add.sprite(game.config.width / 2 + 450, game.config.height / 2 + 280, 'greenAppleSpriteS').setScale(0.8); // spawns banana instead
                        rock.play('applespin');
                    }
                    //rock.body.gravity.x = -1000;
                    rock.body.gravity.y = -2000;
                    rock.body.velocity.x = -380;
                    rock.body.velocity.y = -730;
                    this.isSpawn = true;
                }
                if (!this.gameOver && ranNumber == 3) { // projectile from the right side
                    rock = this.physics.add.sprite(game.config.width / 2 + 600, game.config.height / 2 + 100, 'greenAppleSpriteS').setScale(0.8);// bottom // 550 // from -250 to 250
                    rock.play('applespin');

                    // rock2 = this.physics.add.sprite(game.config.width / 2 + 700, game.config.height / 2 + 100, 'greenAppleSpriteS').setScale(0.8);
                    // rock2.play('applespin');
                    rock.body.gravity.x = -350;//-470 -300
                    rock.body.gravity.y = -2600;
                    // rock2.body.gravity.x = -350;//-470 -300
                    // rock2.body.gravity.y = -2600;
                    this.isSpawn = true;
                }

                if (!this.gameOver && ranNumber == 3) { // projectile from the right side
                    rock = this.physics.add.sprite(game.config.width / 2 + 700, game.config.height / 2 + 100, 'greenAppleSpriteS').setScale(0.8);
                    rock.play('applespin');
                    rock.body.gravity.x = -350;//-470 -300
                    rock.body.gravity.y = -2600;
                    this.isSpawn = true;
                    
                }
                //rock.setCollideWorldBounds(true);
                //let isOutOfBound = Phaser.Geom.Rectangle.Overlaps(this.physics.world.bounds, rock.getBounds());
                
                // if(!this.isSpawn)
                //      this.time.addEvent({delay: 1000, callback: ()=> {rock.destroy()}, callbackScope: this, loop: true});
                // //if(!isSpawn) {
                //    // isOutOfBound = Phaser.Geom.Rectangle.Overlaps(this.physics.world.bounds, rock.getBounds());
                //     //if(!isOutOfBound)
                //     //console.log(isNotOutOfBound);
                //     this.isSpawn = false;
                // //}
               
                this.physics.add.overlap(this.baby, rock, () => { // overlapping function
                    if (ranNumber == 0) {
                        appleSounds.play();
                    }
                    if (ranNumber == 1) {
                        canSound.play();
                    }
                    if (ranNumber == 2) {
                        if (randomSpawn == 0) {

                        } else if (randomSpawn == 1) {
                            bananaSound.play();
                        } else if (randomSpawn == 2) {
                            appleSounds.play();
                        }
                    }
                    if (ranNumber == 3) {
                        appleSounds.play();
                    }
                    gameOverSound.play(); // plays gameover sound
                    //rock.setActive(false).setVisible(false);
                    this.baby.stop('babyAnim');
                    this.baby.play('babystun');
                    rock.destroy();
                    //rock2.destroy();
                    // rock2.setActive(false).setVisible(false);
                    // rock2.destroy();
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

                    this.player.anims.stop();
                }, null, this);

            }, callbackScope: this, loop: true

        });
        addScore = this.time.addEvent({ delay: 1000, callback: this.addToScore, callbackScope: this, loop: true }); //calls addToScore every second
    }

    addToScore() {
        if(!this.gameOver) //if game over, stops points from adding
            this.pScore += 10;
        if(this.pScore > highScore)
            highScore += 10;
    }

    randomTimer() { // for future collision spawn rate
        //return Math.floor(Math.random() * 5000) + 1000;
        let num = Math.floor(Math.random() * 3);
        if(num == 0) {
            return 2500; // 0.5 seconds
        }else {
            return 3000; // 2 seconds
        }
    }

    bounds(){
        let bounds = rock.getBounds();
        console.log(bounds);
    }

    update() {

        // if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) { // if R is pressed, restarts game
        //     this.scene.restart();
        // }
        // if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) { // if M is pressed, goes back to menu
        //     this.scene.start("menuScene");
        // }
        
        //let isOutOfBound = Phaser.Geom.Rectangle.Overlaps(this.physics.world.bounds, getBounds());
        // if(bounds > ) {
        //     rock.destroy();
        // }
        // makes background scroll diagonally (tweak for more "speed")
        if (!this.gameOver) {
            this.background.tilePositionX += this.SCROLL_SPEED;
            //this.background.tilePositionY += 2;
        }
        //this.groundScroll.tilePositionX += this.SCROLL_SPEED;
        //this.groundScroll.tilePositionY += this.SCROLL_SPEED;

        // if (!this.gameOver) {
        //     rock.update();
        // }

        

		// check if player is grounded
	    this.baby.isGrounded = this.baby.body.touching.down;
	    // if so, we have jumps to spare
	    if(!this.gameOver && this.baby.isGrounded ) {
            //this.player.anims.play('walk', true);
            
            //this.player.stop('jump');
            //this.player.play('babycar');
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    }
        // allow steady velocity change up to a certain key down duration
	    if(!this.gameOver && this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.space, 150)) {
             
            this.baby.body.velocity.y = this.JUMP_VELOCITY;
            
            if(this.jumps> 1) {
                //if(Phaser.Input.Keyboard.DownDuration(cursors.space))
                    
                this.player.body.velocity.y = this.JUMP_VELOCITY;
                //this.player.stop('jump');
            }

            //this.player.stop('jump');
	        this.jumping = true;
            
	    } 
        // finally, letting go of the UP key subtracts a jump
	    if(!this.gameOver && this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.space) ) {
	    	this.player.play('babycar');
            this.jumps--;
	    	this.jumping = false;
	    }
        if(!this.gameOver && Phaser.Input.Keyboard.JustDown(cursors.space) && this.jumping) {
            //  if(!this.jumping)
            //     this.player.stop('jump');
            // else 
            this.player.stop('babycar');
            if(this.jumps> 1)
                this.player.play('jump');
            this.sound.play('jumpSound', {volume: 0.3});
        }
        this.scoreLeft.text = this.pScore; // updates score +10
        this.highScoreMid.text = highScore; // updates high score
    }
}
