var Enemy = function(game, x, y, key, frame){
	key = 'missile';
	Phaser.Sprite.call(this, game, x, y, key, frame);

	var pixelDensity = Math.floor(this.game.device.pixelRatio);
	if (pixelDensity > 1){pixelDensity = pixelDensity/2;}

	this.scale.setTo(0.15);
	this.anchor.setTo(0.5); 

	this.animations.add('fly');

	this.game.physics.arcade.enableBody(this);
	this.body.allowGravity = false; 

	this.checkWorldBounds = true; 
	this.onOutOfBoundsKill = true; //if coin goes off screen it will kill it

	this.events.onRevived.add(this.onRevived, this); // sets invisible properties to be true

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy; 

Enemy.prototype.onRevived = function() {
	this.game.add.tween(this).to({y: this.y-16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);
	this.body.velocity.x = -1300; // need to match floor speed
	this.animations.play('spin', 10, true);
};
