/// <reference path="~/scripts/app/SpriteSheet/LinkSpriteSheet.js" />
/// <reference path="~/scripts/app/plugins/BaseElement.js" />
define([
    "app/SpriteSheet/LinkSpriteSheet",
    "app/plugins/BaseElement"
], function (linkSpriteSheet, BaseElement) {
    
    // Inherit from Base Element.
    Player.prototype = new BaseElement();
    Player.prototype.constructor = Player;

    // Continue to declare the function.

    var speed = 2.2;

    // Constructor
    function Player() {
        this.defaultState = "standDown";
        this.spriteSheet = linkSpriteSheet;
    }
    
    Player.prototype.GetSpeed = function () {
        return speed;
    }
    
    Player.prototype.MoveRight = function () {
        this.animation.gotoAndPlay("walkingRight");
    }

    Player.prototype.MoveLeft = function () {
        this.animation.gotoAndPlay("walkingLeft");
    }

    Player.prototype.MoveDown = function () {
        this.animation.gotoAndPlay("walkingDown");
    }

    Player.prototype.MoveUp = function () {
        this.animation.gotoAndPlay("walkingUp");
    }

    Player.prototype.StandRight = function () {
        this.animation.gotoAndPlay("standRight");
    }

    Player.prototype.StandLeft = function () {
        this.animation.gotoAndPlay("standLeft");
    }

    Player.prototype.StandUp = function () {
        this.animation.gotoAndPlay("standUp");
    }

    Player.prototype.StandDown = function () {
        this.animation.gotoAndPlay("standDown");
    }

    Player.prototype.LiftingRight = function () {
        this.animation.gotoAndPlay("LiftingRight");
    }

    Player.prototype.StandLiftingRight = function () {
        this.animation.gotoAndPlay("standLiftingRight");
    }

    Player.prototype.CarryingRight = function () {
        this.animation.gotoAndPlay("carryingRight");
    }
        
    Player.prototype.GetCollisionCircle = function () {
        return this.circleShape;
    }

    Player.prototype.Hit = function () {

    }

    return Player;
});