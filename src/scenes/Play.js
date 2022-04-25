var addScore;
var platforms1
var platforms2
var rock;
var spawnRock1;
class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.path = 'assets/';
        //this.load.atlas('sprite', 'rocket1.png', 'kenny_sheet.json'); //atlas temporary example test. will change everything later
        this.load.spritesheet('player', 'baby_car_2.png',{ frameWidth: 200, frameHeight: 200, startFrame: 0, endFrame: 7 });
        this.load.spritesheet('baby', 'baby_2.png',{ frameWidth: 200, frameHeight: 150, startFrame: 0, endFrame: 7 });
        this.load.image('rock', 'rock.png');
        this.load.image('background', 'background.jpg');
        this.load.image('ground','ground.png');
        
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
        // play background music

        let song = this.sound.add('baby_song', {loop: true}); 
        song.play(); //plays song
        let gameOverSound = this.sound.add('game_overSound', {loop: false});
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
        
        // put another tile sprite above the ground tiles
       // this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'ground').setSize(24, 20).setOffset(8, 12).setOrigin(0);
        this.baby = this.physics.add.sprite(game.config.width/9 + 20, game.config.height/2+100, 'baby').setScale(SCALE);
        this.player = this.physics.add.sprite(game.config.width/9, game.config.height/2+100, 'player').setScale(SCALE);
        
        this.player.setCollideWorldBounds(true);
        this.baby.setCollideWorldBounds(true);
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        
        // add physics collider
        this.physics.add.collider(this.player, platforms1);
        this.physics.add.collider(this.baby, platforms2);

        //Game over flag
        this.gameOver = false;
        
        // spawns rock every 2 seconds and if collides with player displays Game Over and ends game song
        this.time.addEvent({delay: this.randomTimer(), callback: () => {
                let ranNumber = Math.floor(Math.random() * 2);// uses random number from 0-1 to spawn which rock
                if (!this.gameOver && ranNumber == 0) {
                    rock = this.physics.add.sprite(game.config.width / 2 + 600, game.config.height / 2 - 170, 'rock'); // top rock
                    rock.body.gravity.y = -2000;
                    rock.body.velocity.x = -800;
                    rock.body.velocity.y = -100;
                }
                if(!this.gameOver && ranNumber == 1) {
                    rock = this.physics.add.sprite(game.config.width / 2 + 600, game.config.height / 2 + 190, 'rock');// bottom
                    rock.body.gravity.y = -2000;
                    rock.body.velocity.x = -800;
                    rock.body.velocity.y = -500;
                }
                this.physics.add.overlap(this.player, rock, () => {
                    gameOverSound.play();
                    rock.destroy();
                    this.gameOver = true;
                    this.add.text(game.config.width / 2, game.config.height / 2, 'Game Over!',).setOrigin(0.5);
                    song.stop(); //stop music when game over
                }, null, this);
            }, callbackScope: this, loop: true});

        //if game over, stops points from adding
        addScore = this.time.addEvent({ delay: 1000, callback: this.addToScore, callbackScope: this, loop: true }); //calls addToScore every second
        
    }

    addToScore() {
        if(!this.gameOver)
            this.pScore += 10;
    }

    randomTimer() { // for future collision spawn rate
        //return Math.floor(Math.random() * 5000) + 1000;
        let num = Math.floor(Math.random() * 2);
        if(num == 0) {
            return 2000; // 2 seconds
        }else {
            return 3000; // 3 seconds
        }
    }

    update() {
        // update tile sprites (tweak for more "speed")
        if (!this.gameOver) {
            this.background.tilePositionX += this.SCROLL_SPEED;
            this.background.tilePositionY += 2;
        }
        //this.groundScroll.tilePositionX += this.SCROLL_SPEED;
        //this.groundScroll.tilePositionY += this.SCROLL_SPEED;

        // if (!this.gameOver) {
        //     rock.update();
        // }

		// check if alien is grounded
	    this.player.isGrounded = this.player.body.touching.down;
	    // if so, we have jumps to spare
	    if(!this.gameOver && this.player.isGrounded ) {
            //this.player.anims.play('walk', true);
	    	this.jumps = this.MAX_JUMPS;
	    	this.jumping = false;
	    }
        // allow steady velocity change up to a certain key down duration
	    if(!this.gameOver && this.jumps > 0 && Phaser.Input.Keyboard.DownDuration(cursors.space, 150)) {
	        this.player.body.velocity.y = this.JUMP_VELOCITY;
            this.baby.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	    } 
        // finally, letting go of the UP key subtracts a jump
	    if(!this.gameOver && this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.space) ) {
	    	this.jumps--;
	    	this.jumping = false;
	    }
        this.scoreLeft.text = this.pScore;
    }
}
