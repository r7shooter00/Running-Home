class Title extends Phaser.Scene
{
    constructor()
    {
        super("titleScreen");
    }

    preload()
    {
        this.load.image('sunset', './assets/Sunset.png');
        this.load.audio('music', './assets/Lost_but_Seeking.wav');
        this.load.audio('start', './assets/start.wav');
    }

    create()
    {
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.background = this.add.tileSprite(0, 0, 640, 480, 'sunset').setOrigin(0, 0);

        this.title = this.add.text(game.config.width / 2, game.config.height / 2 - 100, "Running Home").setOrigin(0.5);
        this.title.setFontFamily('Yellowtail');
        this.title.setColor("orange");
        this.title.setFontSize(48);
        this.title.setPadding(10, 10, 10, 10);

        this.explanation = this.add.text(game.config.width / 2, game.config.height / 2 + 20, "Dodge the snails by pressing left and right\n arrow keys to move, and up arrow key to jump.").setOrigin(0.5);
        this.explanation.setFontFamily('Yellowtail');
        this.explanation.setColor("blue");
        this.explanation.setFontSize(24);
        this.explanation.setPadding(10, 10, 10, 10);

        this.explanation = this.add.text(game.config.width / 2, game.config.height / 2 + 120, "You can't run forever though, you'll get tired.\n Collect the energy orbs to restore energy.\n").setOrigin(0.5);
        this.explanation.setFontFamily('Yellowtail');
        this.explanation.setColor("purple");
        this.explanation.setFontSize(24);
        this.explanation.setPadding(10, 10, 10, 10);

        this.start_button = this.add.text(game.config.width / 2, game.config.height / 2 + 170, "Press space bar to start.").setOrigin(0.5);
        this.start_button.setFontFamily('Yellowtail');
        this.start_button.setColor("orange");
        this.start_button.setFontSize(24);
        this.start_button.setPadding(10, 10, 10, 10);

        let music = this.sound.add('music');
        this.start = this.sound.add('start');

        this.start.setVolume(0.25);

        if (this.sound.context.state === 'suspended')
		{
			this.sound.context.resume();
        }
        
        music.setLoop(true);
		music.setVolume(1);
		music.play();
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