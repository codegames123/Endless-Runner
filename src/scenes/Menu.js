class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.audio('baby_song', './assets/baby_song_2.2_fixed.wav');
        this.load.audio('game_overSound', './assets/game_over.wav');
        this.load.audio('jumpSound', './assets/jump_sound.wav');
        this.load.audio('selectSound', './assets/select_sound.wav');
        this.load.audio('appleSound', './assets/Apple.wav');
        this.load.audio('canSound', './assets/Can-rattle.wav');
        this.load.audio('bananaSound', './assets/Banana-peel.wav');
        this.load.audio('throwSound', './assets/Throw-sound.wav');
        this.load.audio('beerBreak', './assets/Glass_sound.wav');
        this.load.audio('stopSound', './assets/Stop_sign_sound.wav');
        this.load.audio('crateSound','./assets/crate_sound.wav');
        this.load.audio('speedUp','./assets/speedUp.wav');
        this.load.image('menuBackground', './assets/Menu_art_2.png');//menu background
        this.load.image('playButton', './assets/Button-bg.png');//button
        this.load.image('spaceBar', './assets/spacebar-icon.png');//stop sign
        this.load.image('redApple', './assets/red_apple_core_3.png');//red apple
        this.load.image('greenApple', './assets/apple_core_4.png');//red apple
        this.load.image('beerBottle', './assets/beer_bottle_4.png');//beer bottle
        this.load.image('canBottle', './assets/bottle.png');//can bottle
        this.load.image('trashCan', './assets/trash_can.png');//trash can
        this.load.image('banana', './assets/banana_peel.png');//trash can
        this.load.image('box', './assets/wooden_box.png');//trash can
        this.load.image('stopSign', './assets/stop_sign.png');//stop sign

    }

    create() {
        let selectSound = this.sound.add('selectSound', {loop: false}); // initilizes select sound
        let menuTextConfig = {
            fontFamily: 'Impact',
            fontSize: '40px',
            backgroundColor: '',
            color: '#52F0F7',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        this.add.tileSprite(game.config.width/2, game.config.height/2, game.config.width +580, game.config.height + 400, 'menuBackground').setScale(0.65);
        // menuTextConfig.fontFamily = 'MV Boli';
        // this.add.text(game.config.width / 2, game.config.height / 2 - 235, 'Baby Rush', menuTextConfig).setOrigin(0.5);
        menuTextConfig.fontFamily = 'papyrus';
        menuTextConfig.fontSize = 19;
        this.add.text(game.config.width / 2 - 255, game.config.height - 20, 'Controls: 2x                          to Jump or Double Jump', menuTextConfig).setOrigin(0.5);
        //this.add.image(game.config.width / 2, game.config.height / 2 +35, 'playButton', {width: 100}).setScale(0.8);
        const clickPlay = this.add.text(game.config.width / 2 - 50, game.config.height / 2, 'Play', { fontFamily: 'Segoe Script', fontSize: 60, color: 'purple' }).setInteractive()
            .on('pointerdown', () =>  {
                selectSound.play();
                this.scene.start('playScene');})
            .on('pointerover', () => {
                clickPlay.setStyle({fill: 'green'});
            })
            .on('pointerout', () => {
                clickPlay.setStyle({fill: 'purple'})
            });

        //this.add.rectangle(game.config.width / 2 + 300, game.config.height / 2 + 60, 250, 360, 0x6666ff);
        this.add.rectangle(game.config.width / 2 + 250, game.config.height / 2 - 10, 50, 50, 0x6666ff); //green apple
        this.add.rectangle(game.config.width / 2 + 250, game.config.height / 2 - 100, 50, 50, 0x6666ff); // beer bottle rect
        this.add.rectangle(game.config.width / 2 + 350, game.config.height / 2 - 100, 50, 50, 0x6666ff); // can bottle rect
        this.add.rectangle(game.config.width / 2 + 200, game.config.height / 2 + 205, 60, 70, 0x6666ff); // trash can rect
        this.add.rectangle(game.config.width / 2 + 300, game.config.height / 2 + 80, 50, 50, 0x6666ff); // banana rect
        this.add.rectangle(game.config.width / 2 + 350, game.config.height / 2 - 10, 50, 50, 0x6666ff); // red apple rect
        this.add.rectangle(game.config.width / 2 + 300, game.config.height / 2 + 203, 60, 75, 0x6666ff); // stop sign rect
        this.add.rectangle(game.config.width / 2 + 400, game.config.height / 2 + 215,60, 60, 0x6666ff); // box rect
        this.add.text(game.config.width / 2 - 50 + 250, game.config.height / 2 - 190, 'Avoid all Obstacles', { fontFamily: 'Impact', fontSize: 25, color: 'purple' });
        this.add.text(game.config.width / 2 - 50 + 250, game.config.height / 2 - 160, 'Do not let anything hit the baby!', { fontFamily: 'Impact', fontSize: 18, color: 'purple' })

        this.add.image(game.config.width / 2 - 310, game.config.height -20, 'spaceBar').setScale(0.4);
        this.add.image(game.config.width / 2 + 250, game.config.height / 2 - 10, 'greenApple').setScale(0.8);
        this.add.image(game.config.width / 2 + 250, game.config.height / 2 - 100, 'beerBottle').setScale(0.8);
        this.add.image(game.config.width / 2 + 350, game.config.height / 2 - 100, 'canBottle').setScale(0.8);
        this.add.image(game.config.width / 2 + 200, game.config.height / 2 + 205, 'trashCan').setScale(0.3);
        
        this.add.image(game.config.width / 2 + 300, game.config.height / 2 + 80, 'banana').setScale(0.8);
        this.add.image(game.config.width / 2 + 350, game.config.height / 2 - 10, 'redApple').setScale(0.8);
        this.add.image(game.config.width / 2 + 300, game.config.height / 2 + 203, 'stopSign').setScale(0.3);
        this.add.image(game.config.width / 2 + 400, game.config.height / 2 + 215, 'box').setScale(0.3);

    }

    // update(){

    // }
}
