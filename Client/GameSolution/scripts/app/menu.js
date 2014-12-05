define([
   "app/SpriteSheet/ActionSpriteSheet",
   "app/SpriteSheetLoader",
    "easel",
    "preloadjs"
], function (spriteSheetInformation, spriteSheetLoader) {

    // Private fields
    var defaultState = "init";
    var carryButton;

    return {
        Initialize: function (stage) {
            var spriteSheetId = spriteSheetInformation.id;
            var spriteSheet = spriteSheetLoader.GetSpriteSheet(spriteSheetId);
            var animation = new createjs.Sprite(spriteSheet, defaultState);
            
            carryButton = stage.addChild(animation);
            carryButton.x = 10;
            carryButton.y = 10;
            carryButton.rotationX = 0;
            carryButton.rotationY = 0;
            carryButton.scaleY = 0;

            function AnimatingMenu() {
                if (carryButton.scaleY < 1) {
                    carryButton.scaleY += 0.05;
                }

                stage.update();
            }

            stage.update();
            createjs.Ticker.addEventListener("tick", AnimatingMenu);
        },
        DisplayCarryOption: function () {
            if (carryButton.currentAnimation != "carry") {
                carryButton.gotoAndPlay("carry");
                carryButton.scaleY = 0;
            }
        },
        DisplayNoAction: function () {
            if (carryButton.currentAnimation != "init") {
                carryButton.gotoAndPlay(defaultState);
                carryButton.scaleY = 0;
            }
        }
    };
});