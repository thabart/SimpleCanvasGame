define([
    "app/SpriteSheetLoader",
    "easel",
    "preloadjs"
], function (spriteSheetLoader) {

    function BaseElement() {
        this.spriteSheet;
        this.defaultState;

        this.hitDamageCircleShape = null;
        this.hitCircleShape = null;
        this.IsCrossable = true;
    }

    function GetCircle(circle, animation) {
        if (circle == null || typeof circle == "undefined") {
            return null;
        }

        var cx = circle.rx + animation.x;
        var cy = circle.ry + animation.y;
        var radius = circle.radius;
        return {
            x: cx,
            y: cy,
            radius: radius
        };
    }

    function CreateCircle(color, information) {
        var circle = new createjs.Graphics();
        circle
            .setStrokeStyle(1)
            .beginStroke(color)
            .drawCircle(0, 0, information.radius);
        return new createjs.Shape(circle);
    }

    BaseElement.prototype.GetAnimation = function () {
        return this.animation;
    }

    BaseElement.prototype.Create = function () {
        var spriteSheetId = this.spriteSheet.id;
        var spriteSheet = spriteSheetLoader.GetSpriteSheet(spriteSheetId);
        this.animation = new createjs.Sprite(spriteSheet, this.defaultState);

        // Create the circle shape.
        var hitCircleInformation = this.GetHitCircle();
        if (hitCircleInformation != null) {
            var circleShape = CreateCircle("#000000", hitCircleInformation);
            this.hitCircleShape = circleShape;
            this.RefreshHitCircle();
        }

        //Create the damage circle.
        var damageCircleInformation = this.GetDamageCircle();
        if (damageCircleInformation != null) {
            var circleShape = CreateCircle("#ff0000", damageCircleInformation);
            this.hitDamageCircleShape = circleShape;
            this.RefreshDamageCircle();
        }

        // Create an interaction circle.
        var interactionCircle = this.GetInteractionCircle();
        if (interactionCircle != null) {
            var circleShape = CreateCircle("#458B00", interactionCircle);
            this.interactionCircleShape = circleShape;
            this.RefreshInteractionCircle();
        }
    }

    BaseElement.prototype.RefreshHitCircle = function () {
        var hitCircleInformation = this.GetHitCircle();
        this.hitCircleShape.x = hitCircleInformation.x;
        this.hitCircleShape.y = hitCircleInformation.y;
    }

    BaseElement.prototype.RefreshDamageCircle = function () {
        var hitDamageCircle = this.GetDamageCircle();
        this.hitDamageCircleShape.x = hitDamageCircle.x;
        this.hitDamageCircleShape.y = hitDamageCircle.y;
    }

    BaseElement.prototype.RefreshInteractionCircle = function() {
        var interactionCircle = this.GetInteractionCircle();
        this.interactionCircleShape.x = interactionCircle.x;
        this.interactionCircleShape.y = interactionCircle.y;
    }

    BaseElement.prototype.RefreshCircles = function () {
        this.RefreshDamageCircle();
        this.RefreshHitCircle();
        this.RefreshInteractionCircle();
    }

    BaseElement.prototype.GetHitCircle = function () {
        var spriteSheet = this.spriteSheet;
        var animation = this.animation;
        return GetCircle(spriteSheet.hitCircle, animation);
    }

    BaseElement.prototype.GetDamageCircle = function () {
        var spriteSheet = this.spriteSheet;
        var animation = this.animation;
        return GetCircle(spriteSheet.damageCircle, animation);
    }

    BaseElement.prototype.GetInteractionCircle = function () {
        var spriteSheet = this.spriteSheet;
        var animation = this.animation;
        return GetCircle(spriteSheet.interactionCircle, animation);
    }

    BaseElement.prototype.Hit = function () {
        console.log("hit");
    }

    return BaseElement;
});