/// <reference path="~/scripts/lib/require.js" />
/// <reference path="~/scripts/lib/jquery-2.1.1.js" />
/// <reference path="~/scripts/app/PlayerController.js" />
/// <reference path="~/scripts/app/Map.js" />

define([
    "jquery",
    "app/SpriteSheetLoader",
    "app/PlayerController",
    "app/map"
], function ($, spriteSheetLoader, PlayerController, Map) {
    
    // Private fields
    var stage = new createjs.Stage("demoCanvas");
    var fps = 60;
    var useRaf = true;
    var scaleX = 2;
    var scaleY = 2;
    var playerController = null;
    var alreadyInDebugMode = false;
    var map = null;

    //URL : file:///C:/Project/GitProject/CanvasGame/tilemap-renderer/renderer.js
    
    return {
        Start: function () {
            stage.scaleX = scaleX;
            stage.scaleY = scaleY;
            createjs.Ticker.useRAF = useRaf;            createjs.Ticker.setFPS(fps);

            spriteSheetLoader.Initialize(function () {
                map = new Map(stage);
                map.Load();

                playerController = new PlayerController(map);

                function tick(event) {
                    playerController.RefreshPosition();
                    playerController.RefreshState();
                    stage.update();
                }
                
                createjs.Ticker.addEventListener("tick", tick);

                $(document).keydown(function (evt) {
                    playerController.ExecuteActionOnKeyDown(evt.keyCode, stage);
                });

                $(document).keyup(function (evt) {
                    playerController.ExecuteActionOnKeyUp(evt.keyCode);
                });
            });
        },
        LaunchDebugMode: function () {
            if (map != null && !alreadyInDebugMode) {
                map.RunDebugMode();
                alreadyInDebugMode = true;
            }
        }
    }
});