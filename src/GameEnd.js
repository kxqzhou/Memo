

var GameEndLayer = cc.Layer.extend({
    ctor:function (success, mode, pos) {
        this._super();
        
        // ------------ init ------------
        // window size, director can't be accessed outside cc.Layer for some reason
        var winSize = cc.director.getWinSize();

        // black bg, option change color later?
        var background = new cc.LayerColor( cc.color(0, 0, 0) );
        this.addChild( background, 0, TAG_BACKGROUND );        

        var resultLabel = new cc.LabelBMFont("", res.arial_48_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        resultLabel.x = winSize.width / 2;
        resultLabel.y = winSize.height / 4 * 3;
        this.addChild( resultLabel );

        var messageLabel = new cc.LabelBMFont("", res.arial_32_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        messageLabel.x = winSize.width / 2;
        messageLabel.y = winSize.height / 2;
        this.addChild( messageLabel );

        if (success) {
            resultLabel.string = "You did it!";
            if (mode == "colors") {
                var victoryMessage = "You memorized a bunch of " + mode + " for no reason."
                victoryMessage += "\nReward your eyes with a break.";
                messageLabel.setString(victoryMessage);
            }
        } 
        else {
            var failMessage = "You failed after: \n" + pos + " " + mode +  " !";
            resultLabel.setString(failMessage);
            
            var message = "But who cares.\n"; 
            if (mode == "colors") {
                message += "You'll never do this in real life.\n";
            } else if (mode == "groceries") {
                message += "\nReal lists don't have duplicates.\nYou'd check your phone anyway.";
            }
            messageLabel.setString(message);
        }

        var againLabel = new cc.LabelBMFont("PLAY AGAIN", res.arial_48_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        var againButton = new cc.MenuItemLabel( againLabel, this.playAgain, this );
        againButton.x = winSize.width / 2;
        againButton.y = winSize.height / 5;

        var menu = new cc.Menu( againButton );
        menu.x = 0;
        menu.y = 0;
        this.addChild( menu );

        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(res.menu_bgm, true);
    },
    playAgain:function () {
        cc.audioEngine.playEffect( res.again_fx );
        cc.director.runScene( new ModeSelectScene() );
    }
});

var GameEndScene = cc.Scene.extend({
    ctor:function (success, stuff, pos=0) {
        this._super();
        
        var mode = "";
        if (stuff[0] == "black") {
            mode = "colors";
        }

        var layer = new GameEndLayer( success, mode, pos );
        this.addChild(layer);
    }
});


