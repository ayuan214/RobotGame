ZenvaRunner.MainMenu = function() {};

ZenvaRunner.MainMenu.prototype = {
	create: function() {
		//create background
		this.background = this.game.add.tileSprite(0, 0, this.game.width, 512, 'background');
		this.background.autoScroll(-200, 0); // This is going to have it scroll 

		this.foreground = this.game.add.tileSprite(0, 470, this.game.width, this.game.height - 533, 'foreground'); //460+73=533. 533 is the height of the game in total minus the height of the background and the height of the ground. 
		this.foreground.autoScroll(-200,0); 

		this.ground = this.game.add.tileSprite(0, this.game.height-73, this.game.width, 73, 'ground');
		this.ground.autoScroll(-400, 0); // have ground move faster 


		//creat player
		this.player = this.add.sprite(200, this.game.height/2, 'player');
		this.player.anchor.setTo(0.5); //determines where the rotation would occur of sprite as well
		this.player.scale.setTo(1.1); //scales down sprite

		this.player.animations.add('fly', [0,1,2,3,2,1]);
		this.player.animations.play('fly', 8, true); //this.player.animations.play(key, fps, loop?)

		this.game.add.tween(this.player).to({y: this.player.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true); 
		// Having a person bounce in midair
		//tween is game object animation. Add a tween object .to (JSON object of objects want to change [this game y], 500 ms the player y position is, BOB up and down, easing, auto start, don't add delay [0], repeat infinite, and want to yo-yo is to come back up and down )

		//Adding titles
		this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
		this.splash.anchor.setTo(0.5);

		this.startText = this.game.add.bitmapText(0,0, 'minecraftia', 'tap to start', 32);
		this.startText.x = this.game.width/2 - this.startText.textWidth/2; 
		this.startText.y = this.game.height/2 + this.splash.height/2; 

	},

	update: function() {
		if(this.game.input.activePointer.justPressed()){
			this.game.state.start('Game');
		}
	}
}