define([
    "app/collision"
], function (collisionEngine) {

    function Map(playersStage, itemsStage) {
        this.players = [];
        this.enemies = [];
        this.items = [];

        this.playersStage = playersStage;
        this.itemsStage = itemsStage;
    }

    function AddCircles(stage, element) {
        var hitDamageCircle = element.hitDamageCircleShape;
        var hitCircleShape = element.hitCircleShape;
        var interactionCircleShape = element.interactionCircleShape;

        if (hitDamageCircle != null) {
            stage.addChild(hitDamageCircle);
        }

        if (hitCircleShape != null) {
            stage.addChild(hitCircleShape);
        }

        if (interactionCircleShape != null) {
            stage.addChild(interactionCircleShape);
        }
    }

    Map.prototype.Load = function () {

    }

    Map.prototype.AddPlayer = function (player) {
        this.players.push(player);
        var animation = player.GetAnimation();
        this.playersStage.addChild(animation);
        if (this.debugMode) {
            AddCircles(this.playersStage, player);
        }
    }

    Map.prototype.AddBomb = function (bomb, playerX, playerY) {
        var bombAnimation = bomb.GetAnimation();
        var map = this;
        var handleBombAnimationCompleted = function (event) {
            if (event.name == "explod") {
                event.remove();

                collisionEngine.CheckCollision(map.players, bomb.GetDamageCircle())

                map.itemsStage.removeChild(bombAnimation);
                map.itemsStage.removeChild(bomb.hitCircleShape);
                map.itemsStage.removeChild(bomb.hitDamageCircleShape);
                map.itemsStage.removeChild(bomb.interactionCircleShape);

                var bombIndex = map.items.indexOf(bomb);
                map.items.splice(bombIndex, 1);
            }
        }

        bombAnimation.on("animationend", handleBombAnimationCompleted);
        bombAnimation.x = playerX + 30;
        bombAnimation.y = playerY;

        bomb.RefreshCircles();

        this.items.push(bomb);
        this.itemsStage.addChild(bombAnimation);
        if (this.debugMode) {
            AddCircles(this.itemsStage, bomb);
        }
    }

    Map.prototype.RunDebugMode = function () {
        this.debugMode = true;

        for (var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            AddCircles(this.playersStage, player);
        }

        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            AddCircles(this.itemsStage, item);
        }
    }

    Map.prototype.CheckCollision = function (hitCircle) {
        return collisionEngine.CheckCollision(this.items, hitCircle);
    }

    Map.prototype.GetClosestItemToInteractWith = function (interactionCircle) {
        return collisionEngine.GetClosestItemToInteractWith(this.items, interactionCircle);
    }

    return Map;
});