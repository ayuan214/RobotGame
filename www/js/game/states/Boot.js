var ZenvaRunner = function(){};

ZenvaRunner.Boot = function(){};

ZenvaRunner.Boot.prototype = {
	preload: function(){
		this.load.image('logo', 'assets/images/logo2.png');
		this.load.image('preloadbar', 'assets/images/preloader-bar.png');
	},
	create: function(){
		this.game.stage.backgroundColor = "#000";
		this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
		this.splash.anchor.setTo(0.5);
		this.splash.scale.setTo(0.5);


		//Unless you specifically knowy our game needs to support multi-touch I would recommend setting this to 1
		this.input.maxPointers = 1;

		if (this.game.device.desktop){
			// If you have any desktop specific settings they can go in here
			this.scale.pageAlignHorizontally = true; //set this to be in the middle
		} else {
			// Same goes for mobile settings
			// In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"

			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.minWidth = 568;
			this.scale.minHeight = 600;
			this.scale.maxWidth = 2048;
			this.scale.maxHeight = 1536;
			this.scale.forceLandscape = true; 
			this.scale.pageAlignHorizontally = true;
			this.scale.setScreenSize(true); //set this as soon as you can
		}
		// By this point the preloader assets have loaded to the cache. we've set the game settings
		// So now lets start the real preloader going
		this.state.start('Preloader');

	}
};