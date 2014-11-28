define([
    "spritesheets",
    "easel",
    "preloadjs"
], function (spritesheets) {
    
    var loadedSpriteSheets = [];

    function CreateManifest(sprites) {
        var manifest = [];
        for (var i = 0; i < sprites.length; i++) {
            var sprite = sprites[i];
            for (var z = 0; z < sprite.src.length; z++) {
                var id = sprite.id + "_" + z;
                manifest.push({ src: sprite.src[z], id: id });
            }
        }

        return manifest;
    }

    return {
        Initialize: function (callback) {
            var loader;
            
            var handleComplete = function () {
                for (var i = 0; i < spritesheets.length; i++) {
                    var spritesheet = spritesheets[i];
                    var spriteData = spritesheet.spriteData;
                    var images = [];
                    for (var z = 0; z < spritesheet.src.length; z++) {
                        var id = spritesheet.id + "_" + z;
                        images.push(loader.getResult(id));
                    }

                    spriteData.images = images;
                    var loadedSpriteSheet = new createjs.SpriteSheet(spriteData);
                    loadedSpriteSheets.push({ id: spritesheet.id, spriteSheet: loadedSpriteSheet });
                }

                callback();
            }

            var manifest = CreateManifest(spritesheets);
            var loader = new createjs.LoadQueue(false);
            loader.addEventListener("complete", handleComplete);
            loader.loadManifest(manifest);
        },

        GetSpriteSheet: function (id) {
            for (var i = 0; i < loadedSpriteSheets.length; i++) {
                var loadedSpriteSheet = loadedSpriteSheets[i];
                if (loadedSpriteSheet.id == id) {
                    return loadedSpriteSheet.spriteSheet;
                }
            }

            return null;
        }
    };
});