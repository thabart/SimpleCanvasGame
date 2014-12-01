/// <reference path="~/scripts/lib/require.js" />
/// <reference path="~/scripts/lib/jquery-2.1.1.js" />
/// <reference path="~/scripts/app/engine.js" />

define([
    "jquery",
    "app/bootstrapper"
], function ($, engine) {

    $(document).ready(function () {
        engine.Start();
        
        // Look at this tutorial for sprite : http://www.gamefromscratch.com/post/2014/01/09/Creating-dynamically-equipped-characters-in-2D-and-3D-games.aspx

        $("#run-debug-mode").click(function () {
            engine.LaunchDebugMode();
        });
    });
});