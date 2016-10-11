

var GuessPhaseLayer = cc.Layer.extend({
    items:null,
    answer:null,
    place:1,
    positionLabel:null,
    buttons:[],
    ctor:function (stuff, seq) {
        this._super();
        
        // ------------ init ------------
        this.place = 1;
        this.buttons = [];

        // window size, director can't be accessed outside cc.Layer for some reason
        var winSize = cc.director.getWinSize();

        // black bg, option change color later?
        var background = new cc.LayerColor( cc.color(0, 0, 0) );
        this.addChild( background, 0, TAG_BACKGROUND );        

        this.items = stuff;
        this.answer = seq;

        instructLabel = new cc.LabelBMFont("Remember the order of", res.arial_32_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        instructLabel.x = winSize.width / 2;
        instructLabel.y = winSize.height / 4 * 3;
        this.addChild( instructLabel );

        instructLine2Label = new cc.LabelBMFont("what you saw", res.arial_32_fnt, winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        instructLine2Label.x = winSize.width / 2;
        instructLine2Label.y = winSize.height / 4 * 3 - 32;
        this.addChild( instructLine2Label );

        this.positionLabel = new cc.LabelBMFont( this.place.toString(), res.arial_48_fnt, 
                                                    winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        this.positionLabel.x = winSize.width / 2;
        this.positionLabel.y = winSize.height / 2 + 48;
        this.addChild( this.positionLabel );

        // upper left
        this.buttons.push( new cc.MenuItemFont( "yellow", this.verifyChoice, this ) );
        this.buttons[0].fontName = "Arial";
        this.buttons[0].fontSize = 32;
        this.buttons[0].x = winSize.width / 3;
        this.buttons[0].y = winSize.height / 3;

        // upper right 
        this.buttons.push( new cc.MenuItemFont( "red", this.verifyChoice, this ) );
        this.buttons[1].fontName = "Arial";
        this.buttons[1].fontSize = 32;
        this.buttons[1].x = winSize.width * 2 / 3;
        this.buttons[1].y = winSize.height / 3;

        // lower left
        this.buttons.push( new cc.MenuItemFont( "magenta", this.verifyChoice, this ) );
        this.buttons[2].fontName = "Arial";
        this.buttons[2].fontSize = 32;
        this.buttons[2].x = winSize.width / 3;
        this.buttons[2].y = winSize.height / 3 - 64;

        // lower right
        this.buttons.push( new cc.MenuItemFont( "indigo", this.verifyChoice, this ) );
        this.buttons[3].fontName = "Arial";
        this.buttons[3].fontSize = 32;
        this.buttons[3].x = winSize.width * 2 / 3;
        this.buttons[3].y = winSize.height / 3 - 64;

        this.shuffleChoices();

        var menu = new cc.Menu();
        menu.initWithArray( this.buttons );
        menu.x = 0;
        menu.y = 0;
        this.addChild( menu );

        //console.log ("--choosing");
    },
    verifyChoice:function (target) {
        var choice = target.string;
        if (this.place == this.answer.length) {
            // ended with all correct

            cc.audioEngine.playEffect(res.victory_fx);

            cc.director.runScene( new GameEndScene( true, this.items ) )
        }
        else if (choice == this.answer[this.place - 1]) {
            this.place++;
            this.positionLabel.setString(this.place.toString());
            this.shuffleChoices();

            cc.audioEngine.playEffect(res.correct_fx);
        } 
        else {
            cc.audioEngine.playEffect( res.fail_fx );
            cc.director.runScene( new GameEndScene( false, this.items, this.place ) );
        }
    },
    shuffleChoices:function() {
        var correct = this.answer[this.place - 1];
        var chosen = Math.floor( Math.random() * this.buttons.length );
        this.buttons[chosen].string = correct;
        
        var used = [];
        used.push(correct);

        for (var i = 0; i < this.buttons.length; i++) {
            if (i == chosen) {
                continue;
            } 
            else {
                var inUse = true;
                while (inUse) {
                    rand =  Math.floor( Math.random() * this.items.length );
                    var randItem = this.items[rand];
                    var passAll = true;
                    for (var j = 0; j < used.length; j++) {
                        if ( randItem == used[j] ) {
                            passAll = false;
                            break;
                        }
                    }
                    if (passAll) {
                        inUse = false;
                    }
                }
                this.buttons[i].string = randItem;
                used.push(randItem);
            }
        }
    }
});

var GuessPhaseScene = cc.Scene.extend({
    ctor:function (stuff, seq) {
        this._super();
        var layer = new GuessPhaseLayer( stuff, seq );
        this.addChild(layer);
    }
});


