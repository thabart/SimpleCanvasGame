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
        this.defaultState = "standBottom";
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

    Player.prototype.MoveBottom = function () {
        this.animation.gotoAndPlay("walkingBottom");
    }

    Player.prototype.MoveTop = function () {
        this.animation.gotoAndPlay("walkingTop");
    }

    Player.prototype.StandRight = function () {
        this.animation.gotoAndPlay("standRight");
    }

    Player.prototype.StandLeft = function () {
        this.animation.gotoAndPlay("standLeft");
    }

    Player.prototype.StandTop = function () {
        this.animation.gotoAndPlay("standTop");
    }

    Player.prototype.StandBottom= function () {
        this.animation.gotoAndPlay("standBottom");
    }

    Player.prototype.LiftingRight = function () {
        this.animation.gotoAndPlay("LiftingRight");
    }

    Player.prototype.LiftingLeft = function () {
        this.animation.gotoAndPlay("LiftingLeft");
    }

    Player.prototype.LiftingTop = function () {
        this.animation.gotoAndPlay("LiftingTop");
    }

    Player.prototype.LiftingBottom = function () {
        this.animation.gotoAndPlay("LiftingBottom");
    }

    Player.prototype.StandLiftingRight = function () {
        this.animation.gotoAndPlay("standLiftingRight");
    }

    Player.prototype.StandLiftingLeft = function () {
        this.animation.gotoAndPlay("standLiftingLeft");
    }

    Player.prototype.StandLiftingTop = function () {
        this.animation.gotoAndPlay("standLiftingTop");
    }

    Player.prototype.StandLiftingBottom = function () {
        this.animation.gotoAndPlay("standLiftingBottom");
    }

    Player.prototype.CarryingRight = function () {
        this.animation.gotoAndPlay("carryingRight");
    }

    Player.prototype.CarryingLeft = function () {
        this.animation.gotoAndPlay("carryingLeft");
    }

    Player.prototype.CarryingTop = function () {
        this.animation.gotoAndPlay("carryingTop");
    }

    Player.prototype.CarryingBottom = function () {
        this.animation.gotoAndPlay("carryingBottom");
    }
        
    Player.prototype.GetCollisionCircle = function () {
        return this.circleShape;
    }

    Player.prototype.Hit = function () {

    }

    Player.prototype.GetItemPositionsWhenCarrying = function() {
        return this.spriteSheet.itemPositionsWhenCarrying;
    }

    return Player;
});