/// <reference path="~/scripts/app/SpriteSheet/BombSpriteSheet.js" />
/// <reference path="~/scripts/app/plugins/BaseElement.js" />

define([
    "app/SpriteSheet/BombSpriteSheet",
    "app/plugins/BaseElement"
], function (bombSpriteSheet, BaseElement) {

    var timeBeforeAlmostExplod = 6000;
    var timeBeforeExplod = 3000;

    // Inherit from Base Element.
    Bomb.prototype = new BaseElement();
    Bomb.prototype.constructor = Bomb;
    Bomb.prototype.parent = BaseElement.prototype;

    // Constructor
    function Bomb() {
        this.spriteData = bombSpriteSheet.spriteData;
        this.defaultState = "drop";
        this.spriteSheet = bombSpriteSheet;
    }

    Bomb.prototype.Create = function () {
        this.parent.Create.call(this);
        var bomb = this;
        setTimeout(function () {
            bomb.animation.gotoAndPlay("beforeExplod");
            setTimeout(function () {
                bomb.animation.gotoAndPlay("explod");
            }, timeBeforeExplod);
        }, timeBeforeAlmostExplod);
    }

    return Bomb;
});