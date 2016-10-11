

var ModeSelectLayer = cc.Layer.extend({
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
        // it seems tag_bg = 1 is global after all, first def in MainMenu.js 

        var titleLabel = new cc.LabelBMFont("Mode Select", res.arial_48_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        titleLabel.x = winSize.width / 2;
        titleLabel.y = winSize.height / 10 * 8;
        this.addChild( titleLabel, 2 );

        var colorLabel = new cc.LabelBMFont("Colors", res.arial_32_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        var colorChoice = new cc.MenuItemLabel( colorLabel, this.onModeSelect, this );
		colorChoice.x = winSize.width / 2;
        colorChoice.y = winSize.height / 10 * 6;

        var tempLabel = new cc.LabelBMFont("Coming soon", res.arial_32_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        var tempMessage = new cc.MenuItemLabel( tempLabel );
        // it seems the selector and target are optional? or have defaults
		tempMessage.x = winSize.width / 2;
        tempMessage.y = winSize.height / 10 * 4;
        tempMessage.setColor( cc.color(100, 100, 100) );

        var backLabel = new cc.LabelBMFont("Back", res.arial_48_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        var backButton = new cc.MenuItemLabel( backLabel, this.onBackPress, this );
        backButton.x = winSize.width / 2;
        backButton.y = winSize.height / 6;

   		var menu = new cc.Menu(colorChoice, tempMessage, backButton);
        menu.x = 0;
        menu.y = 0;
        this.addChild( menu, 3 );
	},

	onModeSelect:function (target) {
		// mode = target.string
		cc.audioEngine.playEffect( res.mode_select_fx );
		cc.director.runScene( new DifficultyScene(target.string) );
	},

	onBackPress:function () {
		cc.audioEngine.playEffect( res.back_fx );
		cc.director.runScene( new MainMenuScene() );
	}
});

var ModeSelectScene = cc.Scene.extend({
	ctor:function () {
		this._super();
		var layer = new ModeSelectLayer();
		this.addChild(layer);
	}
});


