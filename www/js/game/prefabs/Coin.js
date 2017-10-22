var Coin = function(game, x, y, key, frame){
	key = 'coins';
	Phaser.Sprite.call(this, game, x, y, key, frame);

	this.scale.setTo(1.2);
	this.anchor.setTo(0.5); 

	this.animations.add('spin');

	this.game.physics.arcade.enableBody(this);
	this.body.allowGravity = false; 

	this.checkWorldBounds = true; 
	this.onOutOfBoundsKill = true; //if coin goes off screen it will kill it

	this.events.onKilled.add(this.onKilled, this);
	this.events.onRevived.add(this.onRevived, this); // sets invisible properties to be true

};

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin; 

Coin.prototype.onRevived = function() {
	this.body.velocity.x = -400; // need to match floor speed
	this.animations.play('spin', 10, true);
};

Coin.prototype.onKilled = function() {
	this.animations.frame = 0; 
}