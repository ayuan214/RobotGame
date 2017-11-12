ZenvaRunner.Preload = function() {
	this.ready = false; 
};

ZenvaRunner.Preload.prototype = {
	preload: function() {
		this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
		this.splash.anchor.setTo(0.5); //Anchor of any image is at 0,0 of edge [top left]. This is where the sprite is set to calculate from 
		
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);

		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('ground', 'assets/images/ground.png');
		this.load.image('background', 'assets/images/background.png');
		this.load.image('background1', 'assets/images/background1.png');
		this.load.image('foreground', 'assets/images/foreground.png');
		this.load.image('foreground1', 'assets/images/foreground1.png');

		//this.load.spritesheet('coins', 'assets/images/coins-ps.png', 51, 51, 7);
		//this.load.spritesheet('player', 'assets/images/jetpack-ps.png', 229, 296, 4);
		this.load.spritesheet('coins', 'assets/images/EnergyCapsule.png', 20, 31, 10);
		this.load.spritesheet('player', 'assets/images/WingZero_Flight4.png', 110, 96, 4);
		this.load.spritesheet('missile', 'assets/images/missiles-ps.png', 361, 218, 4);


		this.load.audio('gameMusic', ['assets/audio/GWing_01.ogg', 'assets/audio/GWing_01.m4a', ]);
    	this.load.audio('rocket', 'assets/audio/rocket.wav');
    	this.load.audio('coin', 'assets/audio/energy.wav');
    	this.load.audio('death', 'assets/audio/death1.wav');
    	//this.load.audio('bounce', 'assets/audio/bounce.wav');

		this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia/minecraftia.png', 'assets/fonts/minecraftia/minecraftia.xml');

		this.load.onLoadComplete.add(this.onLoadComplete, this); 
	},

	create: function() {
		this.preloadBar.cropEnabled = false; //make sure the preload bar doesn't get out of hand and let audio decode

	},
	update: function() {
		if(this.cache.isSoundDecoded('gameMusic') && this.ready === true){
			this.state.start('MainMenu');
		}
	},
	onLoadComplete: function(){
		this.ready = true; 
	}
};