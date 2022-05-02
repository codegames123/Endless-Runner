var addScore;
var platforms1
var platforms2
//var projectile;
var highScore = 0;
//var isOutOfBound = true;

class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.path = 'assets/';
        this.load.atlas('player', 'baby_car_spritesheet.png', 'baby_car_sprite.json'); // stroller
        this.load.atlas('baby', 'da_baby.png', 'da_baby_spritesheet.json'); // baby
        this.load.image('redApple', 'red_apple_core.png');
        this.load.image('redApple2', 'red_apple_core_3.png');
        this.load.image('stopSign', './assets/stop_sign.png');
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
        this.load.image('ground','Ground_tile.png');
        
    }
    create() { 
        // variables and settings
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 2;
        this.SCROLL_SPEED = 4;
        currentScene = 3;
        this.physics.world.gravity.y = 2600;
        
        platforms1 = this.physics.add.image(game.config.width/2 + 420, game.config.height/2 + 228, 'ground').setScale(2).setSize(40, 20).setOffset(-5, 30);
        platforms2 = this.physics.add.image(game.config.width/2 + 420, game.config.height/2 + 228, 'ground').setScale(2).setSize(20, 30).setOffset(5, 5); //setSize(width, height), setOffset(left-/right+,up-/down+)
        //platforms.create(game.config.width/2, game.config.height/2 + 228, 'ground').setScale(2) 
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

        //projectile = new projectile(this, game.config.width + (game.config.height / 15) * 6, (game.config.height/15) * 4, 'projectile', 0).setOrigin(0, 0);
        // projectile = this.physics.add.sprite(game.config.width/2 + 600,game.config.height/2 - 170,'projectile');
        // projectile.body.velocity.x = -1900;
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
        this.pScore = 400;
        //this.pointText = this.add.text(game.config.width/2 + 200,game.config.height/2 - 270, 'Points: ', textConfig);
        this.scoreLeft = this.add.text(game.config.width/2 + 300,game.config.height/2 - 270,  this.pScore, textConfig);
        //initilizes and displays high score
        this.highScoreMid = this.add.text(game.config.width/2 + 320,game.config.height/2 - 220, highScore, {fontFamily: 'Courier',fontSize: '18px',color: 'black',align: 'left'});
        this.add.text(game.config.width/2 +260,game.config.height/2 - 220, 'Best:', {fontFamily: 'Courier',fontSize: '18px',color: 'black',align: 'left'});
       
        
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
        this.isSpawn = false;
        // spawns projectile every 1.5-2 seconds and if collides with player displays Game Over and ends game song
        this.time.addEvent({
            delay: this.randomTimer(), callback: () => {
                //let isOutOfBound = false;
                
                let randomSpawn = Math.floor(Math.random() * 2);
                let ranNumber =Math.floor(Math.random() * 4);
                // uses random number from 0-3 to spawn projectiles
                if (!this.gameOver && ranNumber == 0) {
                    throwSound.play();
                    if (randomSpawn == 0) {
                        projectile = this.physics.add.sprite(game.config.width / 2 + 270, game.config.height / 2 + 280, 'redApple').setScale(0.8); // red apple from ground
                    } else if (randomSpawn == 1) {
                        projectile = this.physics.add.sprite(game.config.width / 2 + 270, game.config.height / 2 + 280, 'redApple2').setScale(0.8);
                    }
                    //projectile.body.gravity.x = -1000;
                    projectile.body.gravity.y = -2000;
                    projectile.body.velocity.x = -380;
                    projectile.body.velocity.y = -630;
                    this.isSpawn = true;
                    //isOutOfBound = Phaser.Geom.Rectangle.Overlaps(this.physics.world.bounds, projectile.getBounds()); // checks if item is in the screen
                    //console.log(isOutOfBound);
                }
                if (!this.gameOver && ranNumber == 1) { // projectile from the right side
                    projectile = this.physics.add.sprite(game.config.width / 2 + 505, game.config.height / 2 + (Math.floor(Math.random() * (250 - (-80) + 1)) - 80), 'bottleS').setScale(0.8);// bottom // 550 // from top -250 to bottom 250
                    projectile.play('bottleSpin');
                    projectile.body.gravity.x = -350;//-470 -300
                    projectile.body.gravity.y = -2600;
                    this.isSpawn = true;
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
                    //projectile.body.gravity.x = -1000;
                    projectile.body.gravity.y = -2000;
                    projectile.body.velocity.x = -380;
                    projectile.body.velocity.y = -730;
                    this.isSpawn = true;
                }
                if (!this.gameOver && ranNumber == 3) { // projectile from the right side 
                    projectile = this.physics.add.sprite(game.config.width / 2 + 600, game.config.height / 2 - 100, 'greenAppleSpriteS').setScale(0.8);// bottom // 550 // from -250 to 250
                    projectile.play('applespin');// 600 100
                    projectile.body.gravity.y = -2300;
                    projectile.body.velocity.x = -800;
                    
                    this.isSpawn = true;
                }
                if (!this.gameOver && ranNumber == 4) { // projectile from the right side
                    projectile = this.physics.add.sprite(game.config.width / 2 + 800, game.config.height /2 + 138, 'stopSign').setScale(0.8);// bottom // 550 // from top -250 to bottom 250
                    projectile.body.gravity.x = -450;// - 450 before speed up, -750 after speed up
                    projectile.body.gravity.y = -2600;
                    console.log(this.pScore);

                    if (this.pScore < 2000) {
                        if (this.pScore > 500 && this.pScore < 1000) {
                            projectile.body.gravity.x += -300;
                        } else if (this.pScore > 1000 && this.pScore < 1500) {
                            projectile.body.gravity.x += -600;
                        }
                    }
                        projectile.body.gravity.x += -600;
                    console.log(projectile.body.gravity.x)
                }


                // if (!this.gameOver && ranNumber == 3) { // projectile from the right side
                //     projectile = this.physics.add.sprite(game.config.width / 2 + 700, game.config.height / 2 + 100, 'greenAppleSpriteS').setScale(0.8);
                //     projectile.play('applespin');
                //     projectile.body.gravity.x = -350;//-470 -300
                //     projectile.body.gravity.y = -2600;
                //     this.isSpawn = true;
                    
                // }
                //projectile.setCollideWorldBounds(true);
                //let isOutOfBound = Phaser.Geom.Rectangle.Overlaps(this.physics.world.bounds, projectile.getBounds());
                
               
                this.physics.add.overlap(this.baby, projectile, () => { // overlapping function
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
                    //projectile.setActive(false).setVisible(false);
                    this.baby.stop('babyAnim');
                    this.baby.play('babystun');
                    projectile.destroy();
                    //projectile2.destroy();
                    // projectile2.setActive(false).setVisible(false);
                    // projectile2.destroy();
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
        addScore = this.time.addEvent({ delay: 500, callback: this.addToScore, callbackScope: this, loop: true }); //calls addToScore every second
        
    }

    addToScore() {
        if(!this.gameOver) //if game over, stops points from adding
            this.pScore += 10;
        if(this.pScore % 500 == 0 && this.pScore < 2000) // adds to background speed every score of 500 max 2000
            this.SCROLL_SPEED += 1.5;
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
        let bounds = projectile.getBounds();
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
        //     projectile.destroy();
        // }
        // makes background scroll diagonally (tweak for more "speed")
        if (!this.gameOver) {
            this.background.tilePositionX += this.SCROLL_SPEED;
            this.groundScroll.tilePositionX += this.SCROLL_SPEED;
            //this.stopSign.update(); 
            //this.sprite.update(); 
            //this.background.tilePositionY += 2;
        }

        // if (this.checkCollision(this.sprite, this.stopSign)) {
        //    //this.stopSign.reset();
        //    //console.log(this.baby);
        //     console.log('collided');
        // }
        
        

        // if (!this.gameOver) {
        //     projectile.update();
        // }

        

		// check if player is grounded
	    this.baby.isGrounded = this.baby.body.touching.down;
	    // if so, we have jumps to spare
	    if(!this.gameOver && this.baby.isGrounded ) {
            //this.stroller.anims.play('walk', true);
            
            //this.stroller.stop('jump');
            //this.stroller.play('babycar');
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    }
        // allow steady velocity change up to a certain key down duration
	    if(!this.gameOver && this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.space, 150)) {
             
            this.baby.body.velocity.y = this.JUMP_VELOCITY;
            
            if(this.jumps> 1) {
                //if(Phaser.Input.Keyboard.DownDuration(cursors.space))
                    
                this.stroller.body.velocity.y = this.JUMP_VELOCITY;
                //this.stroller.stop('jump');
            }

            //this.stroller.stop('jump');
	        this.jumping = true;
            
	    } 
        // finally, letting go of the UP key subtracts a jump
	    if(!this.gameOver && this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.space) ) {
	    	this.stroller.play('babycar');
            this.jumps--;
	    	this.jumping = false;
	    }
        if(!this.gameOver && Phaser.Input.Keyboard.JustDown(cursors.space) && this.jumping) {
            //  if(!this.jumping)
            //     this.stroller.stop('jump');
            // else 
            this.stroller.stop('babycar');
            if(this.jumps> 1)
                this.stroller.play('jump');
            this.sound.play('jumpSound', {volume: 0.3});
        }
        

        this.scoreLeft.text = this.pScore; // updates score +10
        this.highScoreMid.text = highScore; // updates high score
    }

    // checkCollision(rocket, ship) {
    //     // simple AABB checking
    //     if (rocket.x < ship.x + ship.width/2 - 300 &&
    //         rocket.x + rocket.width / 2 +15 > ship.x &&
    //         rocket.y < ship.y + ship.height &&
    //         rocket.height + rocket.y > ship.y) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    // checkCollision(rocket, ship) {
    //     // simple AABB checking
    //     if (rocket.x < ship.x + ship.width &&
    //         rocket.x + rocket.width > ship.x &&
    //         rocket.y < ship.y + ship.height &&
    //         rocket.height + rocket.y > ship.y) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
}
