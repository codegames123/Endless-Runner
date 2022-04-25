class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.audio('baby_song', './assets/Baby_song 2.1.wav');
        this.load.audio('game_overSound', './assets/game_over.wav');
    }
    
    create(){
        this.scene.start('playScene');
    }
}