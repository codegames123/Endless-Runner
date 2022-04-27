class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.audio('baby_song', './assets/Baby_song 2.2.wav');
        this.load.audio('game_overSound', './assets/game_over.wav');
        this.load.image('menuBackground', './assets/menuBackground1.png');//temporary background

    }

    create() {
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
        this.add.text(game.config.width / 2 - 290, game.config.height - 10, 'Controls: SPACEBAR to Jump', menuTextConfig).setOrigin(0.5);
        const clickPlay = this.add.text(game.config.width / 2 - 50, game.config.height / 2, 'Play', { backgroundColor: 'aqua', fontFamily: 'Tahoma', fontSize: 60, color: 'purple' }).setInteractive()
            .on('pointerdown', () => 
                this.scene.start('playScene'))
            .on('pointerover', () => {
                clickPlay.setStyle({fill: 'green'});
            })
            .on('pointerout', () => {
                clickPlay.setStyle({fill: 'black'})
            });
    }

    // update(){

    // }
}
