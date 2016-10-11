

var SettingsLayer = cc.Layer.extend({
    ctor:function (success, mode, pos) {
        this._super();
        
        // ------------ init ------------
        // window size, director can't be accessed outside cc.Layer for some reason
        var winSize = cc.director.getWinSize();

        // black bg, option change color later?
        var background = new cc.LayerColor( cc.color(0, 0, 0) );
        this.addChild( background, 0, TAG_BACKGROUND );        

        var titleLabel = new cc.LabelBMFont("Settings", res.arial_48_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        titleLabel.x = winSize.width / 2;
        titleLabel.y = winSize.height / 4 * 3;
        this.addChild( titleLabel );

        var bgmLabel = new cc.LabelBMFont("BGM: on", res.arial_32_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        if (cc.audioEngine.getMusicVolume() < 0.4) {
            bgmLabel.setString("BGM: off");
        }

        var bgmButton = new cc.MenuItemLabel( bgmLabel, this.onBGMPress, this );
        bgmButton.x = winSize.width / 3;
        bgmButton.y = winSize.height / 5 * 3;

        var fxLabel = new cc.LabelBMFont("SFX: on", res.arial_32_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        if (cc.audioEngine.getEffectsVolume() < 1) {
            fxLabel.setString("SFX: off");
        }

        var fxButton = new cc.MenuItemLabel( fxLabel, this.onFXPress, this );
        fxButton.x = winSize.width / 3 * 2;
        fxButton.y = winSize.height / 5 * 3;

        var credits = "Music and Sound Effects by: Eric Matyas\nwww.soundimage.org";
        credits += "\n\nSpecial thanks to the Cocos2D community!"
        var creditsLabel = new cc.LabelBMFont(credits, res.arial_32_fnt, winSize.width * 0.8, cc.TEXT_ALIGNMENT_CENTER);
        creditsLabel.x = winSize.width / 2;
        creditsLabel.y = winSize.height / 12 * 5;
        this.addChild(creditsLabel);

        var backLabel = new cc.LabelBMFont("Back", res.arial_48_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        var backButton = new cc.MenuItemLabel( backLabel, this.onBackPress, this );
        backButton.x = winSize.width / 2;
        backButton.y = winSize.height / 5;

        var menu = new cc.Menu( bgmButton, fxButton, backButton );
        menu.x = 0;
        menu.y = 0;
        this.addChild( menu );
    },
    onBGMPress:function (target) {
        if (target.string == "BGM: on") {
            cc.audioEngine.setMusicVolume(0);
            target.setString("BGM: off");
        } else {
            cc.audioEngine.setMusicVolume(0.5) 
            target.setString("BGM: on");
        }
        
    },
    onFXPress:function (target) {
        if (target.string == "SFX: on") {
            cc.audioEngine.setEffectsVolume(0);
            target.setString("SFX: off");
        } else {
            cc.audioEngine.setEffectsVolume(1);
            target.setString("SFX: on");
        }
    },
    onBackPress:function () {
        cc.audioEngine.playEffect( res.back_fx );
        cc.director.runScene( new MainMenuScene() );
    }
});

var SettingsScene = cc.Scene.extend({
    ctor:function (success, stuff, pos=0) {
        this._super();
        var layer = new SettingsLayer();
        this.addChild(layer);
    }
});


