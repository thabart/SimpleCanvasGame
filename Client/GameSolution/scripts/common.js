/// <reference path="~/scripts/lib/require.js" />

requirejs.config({
    baseUrl: "scripts/lib",
    paths: {
        app: "../app",
        jquery: "jquery-2.1.1",
        easel: "easeljs-0.7.1.min",
        preloadjs: "preloadjs-NEXT.min"
    },
    shim: {
        easel: {
            exports: "createjs"
        }
    }
});

define('spritesheets', function (require) {
    return [
        require('app/spritesheet/LinkSpriteSheet'),
        require('app/spritesheet/BombSpriteSheet')
    ];
});