//Creative Tilt:
//Creative choices that I found notable were the decreasing
//time, adding the task of collecting items while dodging obstacles,
//and all of the art, sound, and music were created by me.
//
//Technical Tilt:
//I wanted to move beyond basic fonts for this project,
//so I spent a notable amount of time importing and formatting
//google fonts for the game. This way I can gain access to
//many more fonts for future projects.

let config =
{
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
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
    scene: [Title, Play, GameOver],
};

google: 
{
    families: ['Yellowtail']
}

let game = new Phaser.Game(config);

let energy, energyCollected;