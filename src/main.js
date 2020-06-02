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