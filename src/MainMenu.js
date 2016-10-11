
// does putting it here make it global ish?
// yes it does it would seem
var TAG_BACKGROUND = 1;

var MainMenuLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		
		// ------------ init ------------
		// window size, director can't be accessed outside cc.Layer for some reason
		var winSize = cc.director.getWinSize();

		// black bg, option change color later?
		var background = new cc.LayerColor( cc.color(0, 0, 0) );
		// using default anchor point 0.5, 0.5 
		// default same size as screen b/c layer
		// default x, y = 0, 0
		this.addChild( background, 0, TAG_BACKGROUND );

		// var titleText = new cc.LabelTTF("Memo", "Arial", 48, cc.TEXT_ALIGNMENT_CENTER);
		// using default cc.VERTICAL_TEXT_ALIGNMENT_TOP
		var titleText = new cc.LabelBMFont("Memo", res.arial_48_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
		titleText.x = winSize.width / 2;
		titleText.y = winSize.height / 4 * 3;
		// font color default white apparently
		this.addChild( titleText, 2 );

		// color tests
		// titleText.color = new cc.Color(100, 100, 100); 

		/*
		var titleBar = new cc.Sprite();
		titleBar.x = winSize.width / 2;
		titleBar.y = winSize.height / 100 * 80;
		this.addChild(titleBar, 3);*/


		var startLabel = new cc.LabelBMFont("Start", res.arial_32_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
		var startButton = new cc.MenuItemLabel( startLabel, this.onStartPress, this );
		startButton.x = winSize.width / 2;
		startButton.y = winSize.height / 2;

		var settingsLabel = new cc.LabelBMFont("Settings", res.arial_32_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
		var settingsButton = new cc.MenuItemLabel( settingsLabel, this.onSettingsPress, this );
			settingsButton.x = winSize.width / 2;
		settingsButton.y = winSize.height / 8 * 3;

		var menu = new cc.Menu(startButton, settingsButton);
		menu.x = 0;
		menu.y = 0;
		this.addChild( menu, 3 );

		if (!cc.audioEngine.isMusicPlaying()) {
			cc.audioEngine.playMusic(res.menu_bgm, true);
		}
	},

	onStartPress:function () {
		// combine resources for mainmenu, modeselect, options, and extraselect later
		// alternatively, just preload all resources at the get-go lol
		// if you already preload stuff, do you ever have to load again? like when game ends and go back to menu

		cc.audioEngine.playEffect( res.start_fx );
		cc.director.runScene( new ModeSelectScene() );
	},

	onSettingsPress:function () {
		cc.audioEngine.playEffect( res.settings_fx );
		cc.director.runScene( new SettingsScene() );
	}
});

var MainMenuScene = cc.Scene.extend({
	ctor:function () {
		this._super();
		var layer = new MainMenuLayer();
		this.addChild(layer);
	}
});

