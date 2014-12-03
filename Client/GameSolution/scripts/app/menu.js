define([
   "app/SpriteSheet/ActionSpriteSheet",
   "app/SpriteSheetLoader",
], function (spriteSheet, spriteSheetLoader) {

    var defaultState = "init";
    var spriteData = spriteSheet;


    var sprite = spriteSheet;

    return {
        Initialize: function (stage) {
            var spriteSheetId = spriteData.id;
            var spriteSheet = spriteSheetLoader.GetSpriteSheet(spriteSheetId);
            var animation = new createjs.Sprite(spriteSheet, defaultState);

            animation.x = 0;
            animation.y = 0;
            animation.skewY = 20;
            stage.addChild(animation);
            stage.update();
        }
    };
});