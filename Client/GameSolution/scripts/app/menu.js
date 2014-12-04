define([
   "app/SpriteSheet/ActionSpriteSheet",
   "app/SpriteSheetLoader",
    "easel",
    "preloadjs"
], function (spriteSheet, spriteSheetLoader) {

    var defaultState = "init";
    var spriteData = spriteSheet;

    var MyGeometry = {
        mixScaleAndRotationX: function (scale, rotation) {
            return Math.sin(rotation / 360 * Math.PI) * scale;
        },
        mixScaleAndRotationY: function (scale, rotation) {
            return Math.cos(rotation / 360 * Math.PI) * scale;
        }
    }

    var sprite = spriteSheet;

    return {
        Initialize: function (stage) {
            var spriteSheetId = spriteData.id;
            var spriteSheet = spriteSheetLoader.GetSpriteSheet(spriteSheetId);
            var animation = new createjs.Sprite(spriteSheet, defaultState);
            
            var container = stage.addChild(animation);
            container.x = 20;
            container.y = 30;
            container.rotationX = 0;
            container.rotationY = 0;
            container.rscaleY = 1;

            function tmp() {
                container.rotationY += 4;
                // container.scaleX = MyGeometry.mixScaleAndRotationX(container.rscaleX, container.rotationX + 90);
                container.scaleY = MyGeometry.mixScaleAndRotationY(container.rscaleY, container.rotationY + 90);
                stage.update();
            }

            stage.update();
            createjs.Ticker.addEventListener("tick", tmp);
        }
    };
});