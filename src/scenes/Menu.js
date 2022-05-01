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
        this.load.image('menuBackground', './assets/menuBackground1.png');//temporary background
        this.load.image('playButton', './assets/Button-bg.png');//temporary background
    }

    create() {
        let selectSound = this.sound.add('selectSound', {loop: false}); // initilizes select sound
        let menuTextConfig = {
            fontFamily: 'Impact',
            fontSize: '40px',
            backgroundColor: '',
            color: '#1BB829',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.image(game.config.width / 2, game.config.height / 2, 'menuBackground');
        this.add.text(game.config.width / 2, game.config.height / 2 - 235, 'Title', menuTextConfig).setOrigin(0.5);
        menuTextConfig.fontFamily = 'Tahoma';
        menuTextConfig.fontSize = 19;
        this.add.text(game.config.width / 2 - 260, game.config.height - 10, 'Controls: 2x SPACEBAR to Jump or Double Jump', menuTextConfig).setOrigin(0.5);
        this.add.image(game.config.width / 2, game.config.height / 2 +35, 'playButton').setScale(0.8);
        const clickPlay = this.add.text(game.config.width / 2 - 50, game.config.height / 2, 'Play', { fontFamily: 'Tahoma', fontSize: 60, color: 'purple' }).setInteractive()
            .on('pointerdown', () =>  {
                selectSound.play();
                this.scene.start('playScene');})
            .on('pointerover', () => {
                clickPlay.setStyle({fill: 'green'});
            })
            .on('pointerout', () => {
                clickPlay.setStyle({fill: 'purple'})
            });
    }

    // update(){

    // }
}
