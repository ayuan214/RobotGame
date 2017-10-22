var Player = function(game, x, y, key, frame){
	key = 'player';
	Phaser.Sprite.call(this, game, x, y, key, frame);

	this.scale.setTo(0.5);
	this.anchor.setTo(1.1); 

	this.animations.add('fly');

	this.game.physics.arcade.enableBody(this);
	this.body.allowGravity = true; 

	this.checkWorldBounds = true; 

	this.events.straightFlight.add(this.straightFlight, this); // sets invisible properties to be true
	//this.events.inFlight.add(this.inFlight, this); // sets invisible properties to be true

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player; 

Player.prototype.straightFlight = function() {
		this.body.allowGravity = false; 
		this.animations.add('fly', [0,1,2,3,2,1]);
		this.animations.play('fly', 8, true); //this.player.animations.play(key, fps, loop?)
		this.game.add.tween(this.player).to({y: this.player.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true); 
};

/*
Player.prototype.inFlight = function() {
		this.animations.add('fly', [0,1,2,3,2,1]);
		this.animations.play('fly', 8, true); //this.player.animations.play(key, fps, loop?)
		this.game.add.tween(this).to({y: this.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true); 
};
*/
