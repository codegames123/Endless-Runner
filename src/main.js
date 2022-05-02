// tame the javashrek
'use strict';

let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 35;

// main game object
let config = {
    type: Phaser.AUTO,
    width: 960,//840
    height: 540,//525
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play]
};

let game = new Phaser.Game(config);

let keySpace, keyM;