
define([
    "app/plugins/Player",
    "app/plugins/Bomb"
], function (Player, Bomb, collisionEngine) {

    // Temporary solution, we have to include later this data in the spriteSheet.
    var itemPositions = [
        [29, {
            rx: 20,
            ry: 8
        }],
        [30, {
            rx: 20,
            ry: 8
        }],
        [31, {
            rx: 20,
            ry: 8
        }],
        [32, {
            rx: 18,
            ry: 8
        }],
        [33, {
            rx: 5,
            ry: -10
        }],
        ["default", {
            rx: 5,
            ry: -10
        }]
    ];

    // Private fields.
    var speed,
        carryingItem = null;

    // Constructor
    function PlayerController(map) {
        this.player = new Player();
        this.player.Create();
        speed = this.player.GetSpeed();

        this.map = map;
        this.map.AddPlayer(this.player);

        InitListeners.call(this);
    }

    function InitListeners() {
        var animation = this.player.GetAnimation();
        var map = this;

        var handlePlayerAnimationCompleted = function (evt) {
            if (evt.name == "LiftingRight") {
                carryingItem.IsCrossable = true;
                map.player.StandLiftingRight();
            }
        }

        animation.on("animationend", handlePlayerAnimationCompleted);
    }

    function GetItemPosition(currentFrame) {
        for (var i = 0; i < itemPositions.length; i++) {
            var itemPosition = itemPositions[i];
            if (itemPosition[0] == currentFrame) {
                return itemPosition[1];
            }
        }

        return GetItemPosition("default");
    }

    function CalculateNewPlayerPosition(animation, hitCircleShape, interactionShape) {
        var result = {
            x : animation.x,
            y: animation.y,
            hitCircleX: hitCircleShape.x,
            hitCircleY: hitCircleShape.y,
            interactionShapeX: interactionShape.x,
            interactionShapeY : interactionShape.y
        };
        var currentAnimation = animation.currentAnimation;

        switch (currentAnimation) {
            case "walkingRight":
            case "carryingRight":
                result.x += speed;
                result.hitCircleX += speed;
                result.interactionShapeX += speed;
                break;
            case "walkingLeft":
                result.x -= speed;
                result.hitCircleX -= speed;
                result.interactionShapeX -= speed;
                break;
            case "walkingUp":
                result.y -= speed;
                result.hitCircleY -= speed;
                result.interactionShapeY -= speed;
                break;
            case "walkingDown":
                result.y += speed;
                result.hitCircleY += speed;
                result.interactionShapeY += speed;
                break;
        }

        return result;
    }

    PlayerController.prototype.RefreshPosition = function () {
        var animation = this.player.GetAnimation();
        var hitCircleShape = this.player.hitCircleShape;
        var interactionCircleShape = this.player.interactionCircleShape;
        var newPosition = CalculateNewPlayerPosition(animation, hitCircleShape, interactionCircleShape);
        var hitCircle = this.player.GetHitCircle();
        hitCircle.x = newPosition.hitCircleX;
        hitCircle.y = newPosition.hitCircleY;
        
        if (!this.map.CheckCollision(hitCircle)) {
            animation.x = newPosition.x;
            hitCircleShape.x = newPosition.hitCircleX;
            interactionCircleShape.x = newPosition.interactionShapeX;
            animation.y = newPosition.y;
            hitCircleShape.y = newPosition.hitCircleY;
            interactionCircleShape.y = newPosition.interactionShapeY;
        }
    }

    PlayerController.prototype.RefreshState = function () {
        var animation = this.player.GetAnimation();
        var currentFrame = animation._currentFrame;
        if (carryingItem != null) {
            var position = GetItemPosition(currentFrame);
            carryingItem.animation.x = animation.x + position.rx;
            carryingItem.animation.y = animation.y + position.ry;

            carryingItem.RefreshCircles();
        }
    }

    PlayerController.prototype.ExecuteActionOnKeyDown = function (keyCode, stage) {
        var animation = this.player.GetAnimation();
        var bombAnimationEnd = function (evt) {
            if (evt.name == "explod") {
                carryingItem = null;
            }
        }

        var currentAnimation = animation.currentAnimation;
        switch (keyCode) {
            case 39:
                if (carryingItem != null) {
                    if (currentAnimation != "carryingRight") {
                        this.player.CarryingRight();
                    }
                } else {
                    if (currentAnimation != "walkingRight") {
                        this.player.MoveRight();
                    }
                }
                break;
            case 37:
                if (currentAnimation != "walkingLeft") {
                    this.player.MoveLeft();
                }
                break;
            case 38:
                if (currentAnimation != "walkingUp") {
                    this.player.MoveUp();
                }
                break;
            case 40:
                if (currentAnimation != "walkingDown") {
                    this.player.MoveDown();
                }
                break;
            case 66:
                var bomb = new Bomb();
                bomb.Create();
                this.map.AddBomb(bomb, animation.x, animation.y);
                bomb.animation.on("animationend", bombAnimationEnd);

                break;
            case 65:
                var interactionCircle = this.player.GetInteractionCircle();
                var item = this.map.GetClosestItemToInteractWith(interactionCircle);
                if (item != null) {
                    this.player.LiftingRight();
                    carryingItem = item;
                }

                break;
        }
    }

    PlayerController.prototype.ExecuteActionOnKeyUp = function (keyCode) {
        var animation = this.player.GetAnimation();
        var currentAnimation = animation.currentAnimation;
        switch (currentAnimation) {
            case "walkingRight":
                this.player.StandRight();
                break;
            case "walkingLeft":
                this.player.StandLeft();
                break;
            case "walkingUp":
                this.player.StandUp();
                break;
            case "walkingDown":
                this.player.StandDown();
                break;
            case "carryingRight":
                this.player.StandLiftingRight();
                break;
        }
    }

    return PlayerController;
});