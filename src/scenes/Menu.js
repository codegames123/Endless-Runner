class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.audio('baby_song', './assets/Baby_song.mp3');
    }
    
    create(){
        this.scene.start('playScene');
    }
}