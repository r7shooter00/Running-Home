class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        this.load.image('sunset', './assets/Sunset.png');
        this.load.image('floor', './assets/Floor.png');
        this.load.image('parallax', './assets/Floor_scroll.png');
        this.load.image('snail', './assets/Snail.png');
        this.load.image('energy', './assets/Energy.png');
        this.load.audio('jump', './assets/jump.wav');
        this.load.audio('energy_sound', './assets/energy.wav');
        this.load.audio('death', './assets/death.wav');
        this.load.atlas('runner', './assets/Runner_atlas.png', './assets/Runner_atlas.json');
    }

    create()
    {
        energy = 5000;
        energyCollected = 0;
        this.spawnRate = 0.0025
        this.numberOfSpawns = 0;

        this.energySpawnTimer = 0;

        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        this.physics.world.gravity.y = 1000;

        this.background = this.add.tileSprite(0, 0, 640, 480, 'sunset').setOrigin(0, 0);

        this.floorScroll = this.add.tileSprite(0, game.config.height - 75, 640, 120, 'parallax').setOrigin(0, 0);

        this.floor = this.physics.add.sprite(0, game.config.height - 25, 'floor').setOrigin(0, 0);
        this.floor.debugShowBody = false;
        this.floor.body.immovable = true;
        this.floor.body.allowGravity = false;


        let runningAnimConfig = {
            key: 'running',
            frames: this.anims.generateFrameNames('runner', { prefix: 'sprite', start: 1, end: 4, zeroPad: 0 }),
            frameRate: 10,
            repeat: -1,
        };

        this.anims.create(runningAnimConfig);
        this.player = this.physics.add.sprite(0, game.config.height / 2 + 25, 'runner', 'sprite2').setOrigin(0, 0);
        this.player.setCollideWorldBounds(true);
        this.player.debugShowBody = false;
        this.player.debugShowVelocity = false;
        
        this.physics.add.collider(this.player, this.floor);

        this.snails = this.physics.add.group();
        this.physics.add.collider(this.snails, this.floor);

        this.energyItem = this.physics.add.group();

        this.energyHeader = this.add.text(80, 32, "Energy: ").setOrigin(0.5);
        this.energyHeader.setFontFamily('Yellowtail');
        this.energyHeader.setColor("orange");
        this.energyHeader.setFontSize(48);

        this.energyCounter = this.add.text(185, 32, "").setOrigin(0.5);
        this.energyCounter.setFontFamily('Yellowtail');
        this.energyCounter.setColor("orange");
        this.energyCounter.setFontSize(48);
        this.energyCounter.setPadding(10, 10, 10, 10);

        this.energyCollectedHeader = this.add.text(150, 72, "Energy collected: ").setOrigin(0.5);
        this.energyCollectedHeader.setFontFamily('Yellowtail');
        this.energyCollectedHeader.setColor("orange");
        this.energyCollectedHeader.setFontSize(48);

        this.energyCollectedCounter = this.add.text(300, 72, "").setOrigin(0.5);
        this.energyCollectedCounter.setFontFamily('Yellowtail');
        this.energyCollectedCounter.setColor("orange");
        this.energyCollectedCounter.setFontSize(48);
        this.energyCollectedCounter.setPadding(10, 10, 10, 10);

        this.jump_sound = this.sound.add('jump');
        this.jump_sound.setVolume(0.25);
        this.energy_sound = this.sound.add('energy_sound');
        this.energy_sound.setVolume(0.25);
        this.death_sound = this.sound.add('death');
        this.death_sound.setVolume(0.25);
    }

    update()
    {
        this.energyCounter.setText(energy);
        this.energyCollectedCounter.setText(energyCollected);
        energy--;
        this.energySpawnTimer++;

        this.floorScroll.tilePositionX += 3
        if(Phaser.Input.Keyboard.JustDown(this.leftKey) && this.player.flipX === false)
        {
            this.player.toggleFlipX();
        }
        if(Phaser.Input.Keyboard.JustDown(this.rightKey) && this.player.flipX === true)
        {
            this.player.toggleFlipX();
        }
        if(this.leftKey.isDown)
        {
            this.player.setVelocityX(-200);
            this.player.play('running', true);
        }
        else if(this.rightKey.isDown)
        {
            this.player.setVelocityX(200);
            this.player.play('running', true);
        }
        else
        {
            this.player.setVelocityX(0);
            this.player.setTexture('runner', 'sprite2');
        }

        if(Phaser.Input.Keyboard.JustDown(this.upKey))
        {
            if(this.player.body.touching.down)
            {
                this.jump_sound.play();
                this.player.setVelocityY(-750);
            }
        }

        if(Math.random() < this.spawnRate)
        {
            this.currentSnail = this.snails.create(game.config.width - 64, game.config.height - 57, 'snail');
            this.currentSnail.setVelocityX(-100);
            this.currentSnail.debugShowBody = false;
            this.currentSnail.debugShowVelocity = false;
            this.numberOfSpawns++;
        }

        if(this.numberOfSpawns === 25)
        {
            this.spawnRate += 0.001;
            this.numberOfSpawns = 0;
        }

        if(this.physics.collide(this.player, this.snails))
        {
            this.death_sound.play();
            this.scene.start('gameOverScene');
        }

        if(energy === 0)
        {
            this.death_sound.play();
            this.scene.start('gameOverScene');
        }

        if(this.snails.getFirstAlive() !== null)
        {
            if(this.snails.getFirstAlive().x <= 0)
                this.snails.remove(this.snails.getFirstAlive(), true, true);
        }

        if(this.energySpawnTimer === 200)
        {
            this.currentEnergyItem = this.energyItem.create(game.config.width, game.config.height / 2, 'energy');
            this.currentEnergyItem.setVelocityX(-500);
            this.currentEnergyItem.debugShowBody = false;
            this.currentEnergyItem.debugShowVelocity = false;
            this.currentEnergyItem.body.allowGravity = false;
            this.energySpawnTimer = 0;
        }

        if(this.energyItem.getFirstAlive() !== null)
        {
            if(this.energyItem.getFirstAlive().x <= 0)
                this.energyItem.remove(this.energyItem.getFirstAlive(), true, true);
        }

        if(this.physics.collide(this.player, this.energyItem))
        {
            this.energy_sound.play();
            this.energyItem.remove(this.energyItem.getFirstAlive(), true, true);
            energy += 250;
            energyCollected += 1;
        }
    }
}