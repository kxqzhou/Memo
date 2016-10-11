

var ShowSequenceLayer = cc.Layer.extend({
    sequence:[],
    passedTime:0,
    index:1,
    tick:0,
    displayTime:1.0,
    showLabel:null,
    items:null,
    prevX:0,
    prevY:0,
    winSize:null,
    confuser:null,
    mode:"Colors",
    ctor:function (mode, seqLength) {
        this._super();
        
        // ------------ init ------------
        this.winSize = cc.director.getWinSize();

        // black bg, option change color later?
        var background = new cc.LayerColor( cc.color(0, 0, 0) );
        this.addChild( background, 0, TAG_BACKGROUND );

        this.mode = mode;
        if (mode == "Colors") {
            this.items = ["black", "red", "orange", "yellow", "green", "blue", "purple", "white"];
            // var aux_colors = ["pink", "brown"]; // if adding more colors later? maybe
            this.confuser = { "red": cc.color(255, 0, 0), "orange": cc.color(255, 165, 0),
                            "yellow": cc.color(255, 255, 0), "green": cc.color(0, 255, 0),
                            "blue": cc.color(0, 0, 255), "purple": cc.color(255, 0, 255),
                            "white": cc.color(255, 255, 255), "black": cc.color(100, 100, 100) };
            // black's color is a dull gray so as not to clash with background
            // (0, 255, 255) is some teal color, not yellow, which apparently is 255,255,0 ?? red + green = yellow?? 
            // (200, 200, 200) is some dull gray, not orange
        } else if (mode == "Groceries") {
            /*
            1 eggs
            2 carrots
            3 potatoes
            5 cabbage
            6 broccoli
            7 chicken (maybe real bird lol or cartoon like simon cat if u draw)
            -- or like 'meat' and say 'that isn't a (specific) food'
            8 
            */
        }

        this.sequence = [];
        for (var i = 0; i < seqLength; i++) {
            var rand = Math.floor( Math.random() * this.items.length );
            // apparently this gives you from {0, bound} inclusive
            // just kidding.. used seqLength instead of colors.length smh
            this.sequence.push( this.items[rand] );
        }

        this.showLabel = new cc.LabelBMFont(this.sequence[0], res.arial_60_fnt, 
                                            this.winSize.width, cc.TEXT_ALIGNMENT_CENTER);
        this.showLabel.x = this.winSize.width / 2;
        this.showLabel.y = this.winSize.height / 2;
        this.addChild(this.showLabel);

        this.prevX = this.winSize.width / 2;
        this.prevY = this.winSize.height / 2;

        // seems u need to reset this garbage, just reinstantiating doesn't do so..?
        this.passedTime = 0;
        this.index = 1;
        this.tick = 0;
        this.displayTime = 1.0;

        this.scheduleUpdate();
    },
    update:function (dt) {
        this.passedTime += dt;

        var seqLength = this.sequence.length;

        if (this.passedTime >= this.displayTime) {
            // uncomment below to test guess phase correctness validation 
            //console.log( this.showLabel.string );

            if (this.index == seqLength) {
                this.showLabel.string = "Did you get that?";
                this.showLabel.x = this.winSize.width / 2;
                this.showLabel.y = this.winSize.height / 2;
                
                if (this.mode == "Colors") {
                    this.showLabel.setColor( this.confuser["white"] );
                }

                this.unscheduleUpdate();
                
                // need to fix this animation..
                cc.director.runScene( new cc.TransitionSlideInR( 3, new GuessPhaseScene( this.items, this.sequence ) ) );
                // hmm...looks like cocos2d lite doesn't support transition effects..
                // downloaded a custom version of cocos2d-js to get transition 
            } else {
                this.showLabel.string = this.sequence[this.index];
                this.index++;

                if (this.mode == "Colors") {
                    // update the position of the string to not be the same as the previous pos +/- 5
                    while (this.showLabel.x > this.prevX - 5 && this.showLabel.x < this.prevX + 5) {
                        this.showLabel.x = Math.floor( (Math.random() * this.winSize.width / 3) + this.winSize.width / 3 );
                    }
                    while (this.showLabel.y > this.prevY - 5 && this.showLabel.y < this.prevY + 5) {
                        this.showLabel.y = Math.floor( (Math.random() * this.winSize.height / 3) + this.winSize.height / 3 );
                    }
                }
                this.prevX = this.showLabel.x;
                this.prevY = this.showLabel.y;
                // maybe groceries should have a 50-50 chance to ignore prev pos since
                // it should only be like up or down position 

                // confusiom
                // 0- seq / 5 : empty
                // seq / 5 - seq 3 / 5 : expected except bg match
                // 3 / 5 - end : random 
                if (this.index > seqLength / 5 * 3) {
                    var rand = Math.floor( Math.random() * this.items.length );
                    if (this.mode == "Colors") {
                        this.showLabel.setColor( this.confuser[ this.items[rand] ] );
                    }
                }
                else if (this.index > seqLength / 5) {
                    if (this.mode == "Colors") {
                        this.showLabel.setColor( this.confuser[ this.showLabel.string ] );
                    }
                } 

                this.tick++;
                if (this.tick == seqLength / 5) {
                    this.tick = 0;
                    this.displayTime -= 0.15;
                    // check difficulty, minimum time was 0.2 with -0.2
                    // i think 0.15 is ok
                }

                this.passedTime = 0;
            }
        }
    }
});

var ShowSequenceScene = cc.Scene.extend({
    ctor:function (mode, seqLength) {
        // 0: colors
        this._super();
        var layer = new ShowSequenceLayer( mode, seqLength );
        this.addChild(layer);
    }
});


