/// <reference path="~/scripts/lib/require.js" />
/// <reference path="~/scripts/lib/jquery-2.1.1.js" />
/// <reference path="~/scripts/app/PlayerController.js" />
/// <reference path="~/scripts/app/Map.js" />

define([
    "jquery",
    "app/SpriteSheetLoader",
    "app/PlayerController",
    "app/map",
    "app/menu"
], function ($, spriteSheetLoader, PlayerController, Map, menu) {
    
    // Private fields
    var playerStage = new createjs.Stage("playerCanvas");
    var itemsStage = new createjs.Stage("itemsCanvas");
    var menuStage = new createjs.Stage("menuCanvas");

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
            playerStage.scaleX = scaleX;
            playerStage.scaleY = scaleY;
            itemsStage.scaleX = scaleX;
            itemsStage.scaleY = scaleY;
            menuStage.scaleX = scaleX;
            menuStage.scaleY = scaleY;

            createjs.Ticker.useRAF = useRaf;            createjs.Ticker.setFPS(fps);

            spriteSheetLoader.Initialize(function () {
                map = new Map(playerStage, itemsStage);
                map.Load();

                menu.Initialize(menuStage);

                playerController = new PlayerController(map);

                function tick(event) {
                    playerController.RefreshPosition();
                    playerController.RefreshState();
                    playerController.RefreshPossibleActions();

                    playerStage.update();
                    itemsStage.update();
                }
                
                createjs.Ticker.addEventListener("tick", tick);

                $(document).keydown(function (evt) {
                    playerController.ExecuteActionOnKeyDown(evt.keyCode, playerStage);
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