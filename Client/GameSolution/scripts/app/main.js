/// <reference path="~/scripts/lib/require.js" />
/// <reference path="~/scripts/lib/jquery-2.1.1.js" />
/// <reference path="~/scripts/app/engine.js" />

define([
    "jquery",
    "app/bootstrapper"
], function ($, engine) {

    $(document).ready(function () {
        engine.Start();
        
        $("#run-debug-mode").click(function () {
            engine.LaunchDebugMode();
        });
    });
});