var VLaser = function(game, x, y, key, frame){
	key = 'vlaser';
	Phaser.Sprite.call(this, game, x, y, key, frame);

	var pixelDensity = Math.floor(this.game.device.pixelRatio);
	if (pixelDensity > 1){pixelDensity = pixelDensity/2;}

	this.scale.setTo(0.5 * pixelDensity); //scales down sprite
	this.anchor.setTo(0.5); //determines where the rotation would occur of sprite as well
	
	this.animations.add('vresonate');

	this.scale.setTo(0.4 * pixelDensity);
	this.anchor.setTo(0.5); 

	this.game.physics.arcade.enableBody(this);
	this.body.allowGravity = false; 

	this.checkWorldBounds = true; 
	this.onOutOfBoundsKill = true; //if coin goes off screen it will kill it

	this.events.onRevived.add(this.onRevived, this); // sets invisible properties to be true

};

VLaser.prototype = Object.create(Phaser.Sprite.prototype);
VLaser.prototype.constructor = VLaser; 
VLaser.prototype.onRevived = function() {
	//this.game.add.tween(this).to({y: this.y-16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);
	this.body.velocity.x = -300; // need to match floor speed
	this.animations.play('vresonate', 8, true); //this.player.animations.play(key, fps, loop?)
};
