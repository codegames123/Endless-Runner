class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        //this.load.audio('baby_song', './assets/Baby_song.mp3');]
        //load background music
        this.load.audio('bg_music', './assets/Baby_song 2.1.m4a');
    }
    
    create(){
        this.scene.start('playScene');
    }
}
