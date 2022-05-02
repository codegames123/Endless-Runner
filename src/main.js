/*
Collaborators: Omar Bahlool, Yi Ding, James Pollard, Nathan Laureta
Jobs: 
    Background, menu, and ground art by Omar Bahlool 
    Sprites, projectiles, and animations by Yi Ding
    UI and sounds by James Pollard
    Programmer: Nathan Laureta
Game Title: Baby Rush
Date Completed: 5/2/2022

Creative tilt justification:
We have indeed looked beyond the class examples by applying different types of physics to each object.
we also added a high score system below the current score to track the player's highest score across
scenes. Also at every score of +500, background and some objects will go faster. A little sound will also 
play. The game also does use music and art that we are proud of. We implemented little sounds that are played 
for all collisions and jumps. We also put in little animations for some objects, the baby, and the character's 
stroller when on the ground or when the player jumps for more visual style.
*/

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
            debug: false,
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