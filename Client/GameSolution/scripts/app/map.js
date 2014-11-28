define([
    "app/collision"
], function (collisionEngine) {

    function Map(stage) {
        this.players = [];
        this.enemies = [];
        this.items = [];

        this.stage = stage;
    }

    function AddCircles(stage, element) {
        var hitDamageCircle = element.hitDamageCircleShape;
        var hitCircleShape = element.hitCircleShape;
        if (hitDamageCircle != null) {
            stage.addChild(hitDamageCircle);
        }

        if (hitCircleShape != null) {
            stage.addChild(hitCircleShape);
        }
    }

    Map.prototype.Load = function () {

    }

    Map.prototype.AddPlayer = function (player) {
        this.players.push(player);
        var animation = player.GetAnimation();
        this.stage.addChild(animation);
        if (this.debugMode) {
            AddCircles(this.stage, player);
        }
    }

    Map.prototype.AddBomb = function (bomb, playerX, playerY) {
        var bombAnimation = bomb.GetAnimation();
        var map = this;
        var handleBombAnimationCompleted = function (event) {
            if (event.name == "explod") {
                event.remove();

                collisionEngine.CheckCollision(map.players, bomb.GetDamageCircle())

                map.stage.removeChild(bombAnimation);
                map.stage.removeChild(bomb.hitCircleShape);
                map.stage.removeChild(bomb.hitDamageCircleShape);
                var bombIndex = map.items.indexOf(bomb);
                map.items.splice(bombIndex, 1);
            }
        }

        bombAnimation.on("animationend", handleBombAnimationCompleted);
        bombAnimation.x = playerX + 30;
        bombAnimation.y = playerY;

        bomb.RefreshHitCircle();
        bomb.RefreshDamageCircle();

        this.items.push(bomb);
        this.stage.addChild(bombAnimation);
        if (this.debugMode) {
            AddCircles(this.stage, bomb);
        }
    }

    Map.prototype.RunDebugMode = function () {
        this.debugMode = true;

        for (var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            AddCircles(this.stage, player);
        }

        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            AddCircles(this.stage, item);
        }
    }

    Map.prototype.CheckCollision = function (hitCircle) {
        return collisionEngine.CheckCollision(this.items, hitCircle);
    }

    return Map;
});