var addScore;
var platforms1
var platforms2
var rock;
var highScore = 0;
class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.path = 'assets/';
        //this.load.atlas('sprite', 'rocket1.png', 'kenny_sheet.json'); //atlas temporary example test. will change everything later
        this.load.spritesheet('player', 'baby_car_3.png',{ frameWidth: 350, frameHeight: 345, startFrame: 0, endFrame: 7 }); // stroller
        this.load.spritesheet('baby', 'baby_4.png',{ frameWidth: 295, frameHeight: 300, startFrame: 0, endFrame: 7 }); // baby
        this.load.image('redApple', 'red_apple_core.png');
        this.load.atlas('greenAppleSpriteS', 'greenAppleSprite.png', 'greenAppleSprite.json');
        this.load.image('greenApple', 'apple_core_2.png');
        this.load.image('background', 'background.jpg');
        this.load.image('ground','ground3.png');
        
    }
    create() { 
        // variables and settings
        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 2;
        this.SCROLL_SPEED = 4;
        currentScene = 3;
        this.physics.world.gravity.y = 2600;
        
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0);

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

        this.anims.create({ 
            key: 'applespin', 
            frames: this.anims.generateFrameNames('greenAppleSpriteS', {      
                prefix: 'applespin',
                start: 1,
                end: 5,
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

        let scoreConfig = {
            fontFamily: 'Trebuchet MS',
            fontSize: '28px',
            backgroundColor: 'lightgreen',
            color: 'black',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        //initilize score;
        this.pScore = 0;
        this.pointText = this.add.text(game.config.width/2 + 200,game.config.height/2 - 270, 'Points: ', textConfig);
        this.scoreLeft = this.add.text(game.config.width/2 + 350,game.config.height/2 - 270,  this.pScore, textConfig);
        this.highScoreMid = this.add.text(game.config.width/2 -270,game.config.height/2 - 270, highScore, textConfig);
        this.add.text(game.config.width/2 -470,game.config.height/2 - 270, 'High score:', textConfig);
        
        // put another tile sprite above the ground tiles
       // this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'ground').setSize(24, 20).setOffset(8, 12).setOrigin(0);

        this.baby = this.physics.add.sprite(game.config.width/9 + 15, game.config.height/2-30, 'baby').setScale(0.38).setSize(220, 255).setOffset(30, 50);
        this.player = this.physics.add.sprite(game.config.width/9, game.config.height/2-30, 'player').setScale(0.38);
        
        this.player.setCollideWorldBounds(true);
        this.baby.setCollideWorldBounds(true);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        
        // add physics collider
        this.physics.add.collider(this.player, platforms1);
        this.physics.add.collider(this.baby, platforms2);

        //Game over flag
        this.gameOver = false;
        
        // spawns projectile every 1.5-2 seconds and if collides with player displays Game Over and ends game song
        this.time.addEvent({
            delay: this.randomTimer(), callback: () => {
                let ranNumber = Math.floor(Math.random() * 2);// uses random number from 0-1 to spawn which rock
                if (!this.gameOver && ranNumber == 0) {
                    rock = this.physics.add.sprite(game.config.width / 2 + 270, game.config.height / 2 + 300, 'redApple').setScale(0.8); // top rock
                    //rock.body.gravity.x = -1000;
                    rock.body.gravity.y = -2000;
                    rock.body.velocity.x = -380;
                    rock.body.velocity.y = -630;
                }
                if (!this.gameOver && ranNumber == 1) {
                    rock = this.physics.add.sprite(game.config.width / 2 + 600, game.config.height / 2 + (Math.floor(Math.random() * (250 -(-250) + 1)) - 250), 'greenAppleSpriteS').setScale(0.8);// bottom // 550 // from -250 to 250
                    //console.log((Math.floor(Math.random() * (250 -(-250) + 1)) - 250)); //(Math.floor(Math.random() * (250 -(-250) + 1)) - 250)
                    rock.play('applespin');
                    rock.body.gravity.x = -350;//-470 -300
                    rock.body.gravity.y = -2600;
                }
                this.physics.add.overlap(this.baby, rock, () => {
                    gameOverSound.play(); // plays gameover sound
                    rock.destroy();
                    this.gameOver = true;
                    this.add.text(game.config.width / 2, game.config.height / 2, 'Game Over!', { fontSize: 50, color: 'orange' }).setOrigin(0.5);
                    const clickRestart = this.add.text(game.config.width / 2 - 80, game.config.height / 2 + 40, 'Restart?', {fontSize: 30, color: '#52F0F7' }).setInteractive()
                        .on('pointerdown', () => {
                            selectSound.play();
                            this.scene.restart();})
                        .on('pointerover', () => {
                            clickRestart.setStyle({ fill: 'yellow' });
                        })
                        .on('pointerout', () => {
                            clickRestart.setStyle({ fill: '#52F0F7' })
                        });
                        const clickMenu = this.add.text(game.config.width / 2 - 80, game.config.height / 2 + 90, 'Menu', { fontSize: 30, color: '#52F0F7' }).setInteractive()
                        .on('pointerdown', () => {
                            selectSound.play();
                            this.scene.start('menuScene');})
                        .on('pointerover', () => {
                            clickMenu.setStyle({ fill: 'green' });
                        })
                        .on('pointerout', () => {
                            clickMenu.setStyle({ fill: '#52F0F7' })
                        });
                    song.stop(); //stop music when game over
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
            return 1500; // 0.5 seconds
        }else {
            return 2000; // 2 seconds
        }
    }

    update() {

        // if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) { // if R is pressed, restarts game
        //     this.scene.restart();
        // }
        // if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) { // if M is pressed, goes back to menu
        //     this.scene.start("menuScene");
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
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    }
        // allow steady velocity change up to a certain key down duration
	    if(!this.gameOver && this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.space, 150)) {
            this.baby.body.velocity.y = this.JUMP_VELOCITY;
            if(this.jumps> 1)
                this.player.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	    } 
        // finally, letting go of the UP key subtracts a jump
	    if(!this.gameOver && this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.space) ) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
        if(!this.gameOver && Phaser.Input.Keyboard.JustDown(cursors.space) && this.jumping)
                this.sound.play('jumpSound');
        this.scoreLeft.text = this.pScore; //displays updates score +10
        this.highScoreMid.text = highScore; // displays updated high score
    }
}
