class GameOver extends Phaser.Scene
{
    constructor()
    {
        super("gameOverScene");
    }

    preload()
    {
        this.load.image('sunset', './assets/Sunset.png');
        this.load.audio('start', './assets/start.wav');
    }

    create()
    {
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.background = this.add.tileSprite(0, 0, 640, 480, 'sunset').setOrigin(0, 0);

        this.title = this.add.text(game.config.width / 2 + 25, game.config.height / 2 - 100, "Game Over").setOrigin(0.5);
        this.title.setFontFamily('Yellowtail');
        this.title.setColor("orange");
        this.title.setFontSize(48);
        this.title.setPadding(10, 10, 10, 10);

        this.explanation = this.add.text(game.config.width / 2, game.config.height / 2 + 35, "Energy Collected: ").setOrigin(0.5);
        this.explanation.setFontFamily('Yellowtail');
        this.explanation.setColor("purple");
        this.explanation.setFontSize(30);
        this.explanation.setPadding(10, 10, 10, 10);

        this.explanation = this.add.text(game.config.width / 2 + 100, game.config.height / 2 + 35, energyCollected).setOrigin(0.5);
        this.explanation.setFontFamily('Yellowtail');
        this.explanation.setColor("purple");
        this.explanation.setFontSize(30);
        this.explanation.setPadding(10, 10, 10, 10);

        this.explanation = this.add.text(game.config.width / 2, game.config.height / 2 + 135, "Press space bar to try again").setOrigin(0.5);
        this.explanation.setFontFamily('Yellowtail');
        this.explanation.setColor("blue");
        this.explanation.setFontSize(30);
        this.explanation.setPadding(10, 10, 10, 10);

        this.start = this.sound.add('start');
        this.start.setVolume(0.25);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(this.spaceBar))
        {
            this.start.play();
            this.scene.start("playScene");
        }
    }
}