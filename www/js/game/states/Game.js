ZenvaRunner.Game = function() {

	this.gameState = 'Running';
	this.playerMinAngle = -20;
	this.playerMaxAngle = 20;

	this.coinRate = 1000; // every 1000 ms new coin
	this.coinTimer = 0; // what is being checked every game loop to make new coin 

	this.enemyRate = 2000;
	this.enemyTimer = 0; 

	this.coinScore = 0;
	this.distance = 0; 
	this.distanceScore = 0;
	this.previousCoinType = null;

	this.coinSpawnX = null;
	this.coinSpacingX = 10;
	this.coinSpacingY = 10;

	this.backgroundCounter = 0;
	this.backgroundSelector = 0;   
};

ZenvaRunner.Game.prototype = {
	create: function() {
		this.pixelDensity = Math.floor(this.game.device.pixelRatio);
		if (this.pixelDensity > 1){this.pixelDensity = this.pixelDensity/2;}
		//console.log(this.pixelDensity);

		this.game.world.bound = new Phaser.Rectangle(0, 0, this.game.width + 300, this.game.height);

				
		//create space background
		this.background = this.game.add.tileSprite(0, 0, this.game.width,this.game.height, 'background1');
		this.background.scale.setTo(this.pixelDensity);
		this.background.autoScroll(-300, 0); // This is going to have it scroll 

		this.foreground = this.game.add.tileSprite(0, 315, this.game.width, 284, 'foreground1'); //460+73=533. 533 is the height of the game in total minus the height of the background and the height of the ground. 
		this.foreground.scale.setTo(this.pixelDensity);
		this.foreground.autoScroll(-300,0); 
		
		
		//create station background

		this.foreground1 = this.game.add.tileSprite(0, 470, this.game.width, this.game.height, 'foreground'); //460+73=533. 533 is the height of the game in total minus the height of the background and the height of the ground. 
		this.foreground1.scale.setTo(this.pixelDensity);
		this.foreground1.autoScroll(-200,0); 
		this.foreground1.alpha = 0;

		this.background1 = this.game.add.tileSprite(0, 0, this.game.width, 472, 'background');
		this.background1.scale.setTo(this.pixelDensity);
		this.background1.autoScroll(-200, 0); // This is going to have it scroll
		this.background1.alpha = 0; 
		

		this.ground = this.game.add.tileSprite(0, this.game.height-73, this.game.width, 73, 'ground');
		this.ground.scale.setTo(this.pixelDensity);
		this.ground.y = Math.floor(this.game.height - this.ground.height * (this.pixelDensity));
		this.ground.autoScroll(-400, 0); // have ground move faster 

		this.foreground.y = Math.floor(this.game.height - (this.ground.height * this.pixelDensity) - (this.foreground.height * this.pixelDensity)); 
		

		//create player
		this.player = this.add.sprite(200, this.game.height/2, 'player');
		this.player.anchor.setTo(0.5); //determines where the rotation would occur of sprite as well
		this.player.scale.setTo(1.1 * this.pixelDensity); //scales down sprite

		this.player.animations.add('fly', [0,1,2,1]);
		this.player.animations.play('fly', 10, true);


		//enable physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 800; //gravity of game

		this.game.physics.arcade.enableBody(this.ground);
		this.ground.body.allowGravity = false; // don't let ground fall
		this.ground.body.immovable = true; //keeps the ground from getting hit and moving

		this.game.physics.arcade.enableBody(this.player); 
		this.player.body.collideWorldBounds = true; // prevents player form falling off screen; 
		//this.player.body.bounce.set(0.25, 0.25); //bounce when hit the ground

		this.coins = this.game.add.group();

		this.enemies = this.game.add.group(); 

		this.scoreText = this.game.add.bitmapText(10, 10, 'minecraftia', 'Score: 0', 24);
		this.distanceText = this.game.add.bitmapText(15, 40, 'minecraftia', 'Distance: 0 M', 16);
		this.coinText = this.game.add.bitmapText(15, 60, 'minecraftia', 'Coin: 0', 16); 

		

		//Sounds
		this.jetSound = this.game.add.audio('rocket');
		this.coinSound = this.game.add.audio('coin');
		this.deathSound = this.game.add.audio('death');
		//this.gravitySound = this.game.add.audio('bounce');
		this.gameMusic = this.game.add.audio('gameMusic');
		this.gameMusic.play('', 0, true);

		this.coinSpawnX = this.game.width + 64; 


	},
	update: function() {

		// changes background color
		if (this.backgroundCounter > 1000){
				if (this.backgroundSelector == 0){
					var foregroundFadeTween = this.game.add.tween(this.foreground).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
					var backgroundFadeTween = this.game.add.tween(this.background).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
					backgroundFadeTween.onComplete.add(function() {
						var backgroundFadeTween1 = this.game.add.tween(this.background1).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
						var foregroundFadeTween1 = this.game.add.tween(this.foreground1).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
					this.backgroundSelector = 1;
					}, this)  
				} else {
					var foregroundFadeTween1 = this.game.add.tween(this.foreground1).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
					var backgroundFadeTween1 = this.game.add.tween(this.background1).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
					backgroundFadeTween1.onComplete.add(function() {
						var backgroundFadeTween = this.game.add.tween(this.background).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
						var foregroundFadeTween = this.game.add.tween(this.foreground).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);

					this.backgroundSelector = 0;
					}, this)  
				}
				
			this.backgroundCounter = 0;
		}

		 if(this.game.input.activePointer.isDown && this.gameState == 'Running') {
      		this.player.body.velocity.y -= 40;
      		if(!this.jetSound.isPlaying) {
       			this.jetSound.play('', 0, true, 0.7);
      		} 
    	} else {
      		this.jetSound.stop();
   		}

		if( this.player.body.velocity.y <0 || this.game.input.activePointer.isDown) {
			if(this.player.angle > 0) {
				this.player.angle = 0;
			}
			if(this.player.angle > this.playerMinAngle){
				this.player.angle -= 0.5; 
			}	
		} else if(this.player.body.velocity.y >=0 && !this.game.input.activePointer.isDown) {
			if(this.player.angle < this.playerMaxAngle){
				this.player.angle += 0.5;
			}
		} // rotates player

		if(this.coinTimer < this.game.time.now) {
			this.generateCoins();
			this.coinTimer = this.game.time.now + this.coinRate; 
		}


		if(this.enemyTimer < this.game.time.now){
			this.createEnemy();
			this.enemyTimer = this.game.time.now + this.enemyRate; 
		}

		
		if(this.gameState == "Running"){
			this.distance += .2;
			this.distanceScore = Math.floor(this.distance);
			this.distanceText.text = 'Distance: ' + this.distanceScore +'M';
			this.score = this.distanceScore  + this.coinScore*10;
			this.scoreText.text = 'Score: ' + this.score;
			this.backgroundCounter += 1; 
			//console.log(this.backgroundCounter); 
		}		


		this.game.physics.arcade.collide(this.player, this.ground, this.groundHit, null, this); // puts player on ground
		if(this.gameState != "GameOver"){
			this.game.physics.arcade.overlap(this.player, this.coins, this.coinHit, null, this); //checks overlap to add points
		}
		this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this); //checks overlap to end game

	},
	shutdown: function() {
		this.player.kill();
		this.coins.destroy();
		this.enemies.destroy();
		this.distance = 0;
		this.distanceScore = 0;
		this.coinScore = 0; 
		this.coinTimer = 0;
		this.enemyTimer = 0; 
		this.score = 0;
		this.backgroundCounter = 0;
		this.backgroundSelector = 0;  
		this.gameState = 'Running';

	},

	createCoin: function() {
		var x = this.game.width; 
		var y = this.game.rnd.integerInRange(50, this.game.world.height-192); 

		var coin = this.coins.getFirstExists(false); 
		if(!coin) {
			coin = new Coin(this.game, 0, 0); 
			this.coins.add(coin);
		}

		coin.reset(x,y); //sets the sprite x & y position 
		coin.revive(); 
		return coin; 
	},

	generateCoins: function(){
		if(!this.previousCoinType || this.previousCoinType < 3) {
      		var coinType = this.game.rnd.integer() % 5;
		      			switch(coinType) {
		        case 0:
		          //do nothing. No coins generated
		          break;
		        case 1:
		        case 2:
		          // if the cointype is 1 or 2, create a single coin
		          //this.createCoin();
		          this.createCoin();

		          break;
		        case 3:
		          // create a small group of coins
		          this.createCoinGroup(2, 2);
		          break;
		        case 4:
		          //create a large coin group
		          this.createCoinGroup(6, 2);
		          break;
		        default:
		          // if somehow we error on the cointype, set the previouscointype to zero and do nothing
		          this.previousCoinType = 0;
		          break;
      		}
      		this.previousCoinType = coinType;
    	} else {
      		if(this.previousCoinType === 4) {
        		// the previous coin generated was a large group, 
        		// skip the next generation as well
       			this.previousCoinType = 3;
      		} else {
        		this.previousCoinType = 0;  
      		}
      
    	}
	},

	createCoinGroup: function(columns, rows) {
	    //create 4 coins in a group
	    var coinSpawnY = this.game.rnd.integerInRange(50, this.game.world.height - 192);
	    var coinRowCounter = 0;
	    var coinColumnCounter = 0;
	    var coin;
	    for(var i = 0; i < columns * rows; i++) {
	      coin = this.createCoin(this.spawnX, coinSpawnY);
	      coin.x = coin.x + (coinColumnCounter * coin.width) + (coinColumnCounter * this.coinSpacingX);
	      coin.y = coinSpawnY + (coinRowCounter * coin.height) + (coinRowCounter * this.coinSpacingY);
	      coinColumnCounter++;
	      if(i+1 >= columns && (i+1) % columns === 0) {
	        coinRowCounter++;
	        coinColumnCounter = 0;
	      } 
	    }
  	},

	createEnemy: function() {
		var x = this.game.width; 
		var y = this.game.rnd.integerInRange(50, this.game.world.height-192); 

		var enemy = this.enemies.getFirstExists(false); 
		if(!enemy) {
			enemy = new Enemy(this.game, 0, 0); 
			this.enemies.add(enemy);
		}

		enemy.reset(x,y); //sets the sprite x & y position 
		enemy.revive(); 
	},

	groundHit: function(player, ground){
		if (this.gameState == 'GameOver') {
			this.player.angle = 270;
			//player.body.velocity.y = 0; //rotate his body when he hits the ground and bounces 

		} else {
			this.player.angle = 0;
			player.body.velocity.y =-200; //rotate his body when he hits the ground and bounces 

		}
		//this.gravitySound.play(); 

	},

	coinHit: function(player, coin){
		this.coinScore++;
		this.coinSound.play(); 
		coin.kill(); 

		var dummyCoin = new Coin(this.game, coin.x, coin.y);
		this.game.add.existing(dummyCoin); 

		dummyCoin.animations.play('spin', 40, true);

		var scoreTween = this.game.add.tween(dummyCoin).to({x: 50, y: 50}, 300, Phaser.Easing.Linear.NONE, true);
		scoreTween.onComplete.add(function() {
			dummyCoin.destroy(); 
			this.coinText.text = 'Coin: ' + this.coinScore;
		}, this)
	},

	enemyHit: function(player, enemy){
		this.gameState = 'GameOver';
		//player.kill();
		enemy.kill();
		this.player.animations.stop('fly'); 
		this.player.animations.add('fall', [3]);
		this.player.animations.play('fall', 1, false);
		this.deathSound.play(); 
		this.gameMusic.stop(); 

		this.ground.stopScroll();
		this.background.stopScroll();
		this.foreground.stopScroll();

		this.enemies.setAll('body.velocity.x', 0); //Run through the group to set all
		this.coins.setAll('body.velocity.x', 0); //Run through the group to set all

		this.enemyTimer = Number.MAX_VALUE; //stops spawning enmies 
		this.coinTimer = Number.MAX_VALUE; // Stops spawning coins

		
		
		var deathTween = this.game.add.tween(this.player).to({angle: 270}, 1000, Phaser.Easing.Bounce.Out, true);
		//scoreboard.show(this.score);

		
		deathTween.onComplete.add(function(){
			var scoreboard = new Scoreboard(this.game);
			scoreboard.show(this.score);
		}, this)  
	}
};