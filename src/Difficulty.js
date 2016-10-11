

var DifficultyLayer = cc.Layer.extend({
	mode:"",
	ctor:function (mode) {
		this._super();
		
		// ------------ init ------------
		this.mode = mode;

		var winSize = cc.director.getWinSize();

		var background = new cc.LayerColor( cc.color(0, 0, 0) );
        this.addChild( background, 0, TAG_BACKGROUND );

        var titleText = new cc.LabelBMFont("Choose a difficulty", res.arial_48_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        titleText.x = winSize.width / 2;
        titleText.y = winSize.height / 5 * 4;
        this.addChild( titleText, 2 );

        var easyLabel = new cc.LabelBMFont("Unlikely", res.arial_32_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        var easyButton = new cc.MenuItemLabel( easyLabel, this.onDifficultyPress, this );
        easyButton.x = winSize.width / 2;
        easyButton.y = winSize.height / 10 * 6;
        easyButton.tag = 1;

        var mediumLabel = new cc.LabelBMFont("Improbable", res.arial_32_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        var mediumButton = new cc.MenuItemLabel( mediumLabel, this.onDifficultyPress, this );
        mediumButton.x = winSize.width / 2;
        mediumButton.y = winSize.height / 2;
        mediumButton.tag = 2;

        var hardLabel = new cc.LabelBMFont("Ridiculous", res.arial_32_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        var hardButton = new cc.MenuItemLabel( hardLabel, this.onDifficultyPress, this );
        hardButton.x = winSize.width / 2;
        hardButton.y = winSize.height / 10 * 4;
        hardButton.tag = 3;

        var extremeLabel = new cc.LabelBMFont("Absurd", res.arial_32_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        var extremeButton = new cc.MenuItemLabel( extremeLabel, this.onDifficultyPress, this );
        extremeButton.x = winSize.width / 2;
        extremeButton.y = winSize.height / 10 * 3;
        extremeButton.tag = 4;

        var backLabel = new cc.LabelBMFont("Back", res.arial_48_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        var backButton = new cc.MenuItemLabel( backLabel, this.onBackPress, this );
        backButton.x = winSize.width / 2;
        backButton.y = winSize.height / 7;

        var menu = new cc.Menu(easyButton, mediumButton, hardButton, extremeButton, backButton);
        menu.x = 0;
        menu.y = 0;
        this.addChild( menu, 3 );
	},
	onDifficultyPress:function (target) {
		var len = 10;
		if (target.tag == 1) {
			len = 10;
		} else if (target.tag == 2) {
			len = 15;
		} else if (target.tag == 3) {
			len = 20;
		} else {
			len = 25;
		}

		//console.log(len);

		cc.audioEngine.playEffect( res.difficulty_pick_fx );
		cc.director.runScene( new InfoScene(this.mode, len) );
	},
	onBackPress:function () {
		cc.audioEngine.playEffect( res.back_fx );
		cc.director.runScene( new ModeSelectScene() );
	}
});

var DifficultyScene = cc.Scene.extend({
	ctor:function (mode) {
		this._super();
		var layer = new DifficultyLayer(mode);
		this.addChild(layer);
	}
});

