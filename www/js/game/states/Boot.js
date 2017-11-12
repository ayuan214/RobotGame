
var ZenvaRunner = function() {};

ZenvaRunner.Boot = function() {};

ZenvaRunner.Boot.prototype = {
  preload: function() {
    this.load.image('logo', 'assets/images/logo2.png');
    this.load.image('preloadbar', 'assets/images/preloader-bar.png');
  },
  create: function() {
    this.game.stage.backgroundColor = '#000';
    
    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    this.input.maxPointers = 1;


    /*
    if (this.game.device.desktop) {
      //  If you have any desktop specific settings, they can go in here
      this.scale.pageAlignHorizontally = true;
    } else {
      //  Same goes for mobile settings.
      //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 568;
      this.scale.minHeight = 600;
      this.scale.maxWidth = 2048;
      this.scale.maxHeight = 1536;
      this.scale.forceLandscape = true;
      this.scale.pageAlignHorizontally = true;
      this.scale.setScreenSize(true);
    } */

    this.scale.maxWidth = window.innerWidth; 
    this.scale.maxHeight = Math.floor(this.scale.maxWidth * 1.333 );
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.refresh();



    //  By this point the preloader assets have loaded to the cache, we've set the game settings
    //  So now let's start the real preloader going
    this.state.start('Preloader');
  }
};