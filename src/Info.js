

var InfoLayer = cc.Layer.extend({
	seqLength:10,
    mode:"",
	ctor:function (mode, len) {
		this._super();
		
		// ------------ init ------------
		this.mode = mode;
		this.seqLength = len;

		// window size, director can't be accessed outside cc.Layer for some reason
		var winSize = cc.director.getWinSize();

		// black bg, option change color later?
		var background = new cc.LayerColor( cc.color(0, 0, 0) );
		// using default anchor point 0.5, 0.5 
		// default same size as screen b/c layer
		// default x, y = 0, 0
		this.addChild( background, 0, TAG_BACKGROUND );
		// it seems tag_bg = 1 is global after all, first def in MainMenu.js 

		var titleText = "Mode: " + mode;
		var helpText = "View a sequence of " + this.seqLength + " " + mode.toLowerCase();

		// after some testing it appears vars are not local to conditionals in javascript, as in python..

		helpText += ".\nPay attention to the words.\nCan you remember them all?";

		var titleLabel = new cc.LabelBMFont(titleText, res.arial_48_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
		titleLabel.x = winSize.width / 2;
		titleLabel.y = winSize.height / 4 * 3;
		this.addChild( titleLabel, 2 );

		var helpLabel = new cc.LabelBMFont(helpText, res.arial_32_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
		helpLabel.x = winSize.width / 2;
		helpLabel.y = winSize.height / 2;
		this.addChild( helpLabel, 3 );

		var goLabel = new cc.LabelBMFont("Go", res.arial_48_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
		var goButton = new cc.MenuItemLabel( goLabel, this.onGoPress, this );
		goButton.x = winSize.width / 3 * 2;
		goButton.y = winSize.height / 4;

		var backLabel = new cc.LabelBMFont("Back", res.arial_48_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
		var backButton = new cc.MenuItemLabel( backLabel, this.onBackPress, this );
		backButton.x = winSize.width / 3;
		backButton.y = winSize.height / 4;

		var menu = new cc.Menu( goButton, backButton );
		menu.x = 0;
		menu.y = 0;
		this.addChild( menu );
	},

	onGoPress:function () {
		// better way than having to pass everything along?
		cc.audioEngine.playEffect( res.go_fx );

		cc.audioEngine.stopMusic();
		cc.audioEngine.playMusic(res.game_bgm, true);

		cc.director.runScene( new ShowSequenceScene(this.mode, this.seqLength) );
	},

	onBackPress: function () {
      		cc.audioEngine.playEffect( res.back_fx );
		cc.director.runScene( new DifficultyScene(this.mode) );
	}
});

var InfoScene = cc.Scene.extend({
	ctor:function (mode, len) {
		// 0: colors
		this._super();
		var layer = new InfoLayer( mode, len );
		this.addChild(layer);
	}
});


