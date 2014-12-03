
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

    var mappingNameAnimation = [
        {
            animation : "carryingRight",
            movement : function(player) {
                player.CarryingRight();
            } 
        },
        {
            animation : "carryingLeft",
            movement : function(player) {
                player.CarryingLeft();
            } 
        },
        {
            animation : "carryingTop",
            movement : function(player) {
                player.CarryingTop();
            } 
        },
        {
            animation : "carryingBottom",
            movement : function(player) {
                player.CarryingBottom();
            } 
        },
        {
            animation : "carryingBottom",
            movement : function(player) {
                player.MoveBottom();
            } 
        },
        {
            animation : "walkingRight",
            movement : function(player) {
                player.MoveRight();
            } 
        },
        {
            animation : "walkingLeft",
            movement : function(player) {
                player.MoveLeft();
            } 
        },
        {
            animation : "walkingTop",
            movement : function(player) {
                player.MoveTop();
            } 
        },
        {
            animation : "walkingBottom",
            movement : function(player) {
                player.MoveBottom();
            } 
        }
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
            case "carryingLeft":
                result.x -= speed;
                result.hitCircleX -= speed;
                result.interactionShapeX -= speed;
                break;
            case "walkingTop":
            case "carryingTop":
                result.y -= speed;
                result.hitCircleY -= speed;
                result.interactionShapeY -= speed;
                break;
            case "walkingBottom":
            case "carryingBottom":
                result.y += speed;
                result.hitCircleY += speed;
                result.interactionShapeY += speed;
                break;
        }

        return result;
    }

    function BombAnimationEnd(event, player) {
        if (event.name == "explod") {
            carryingItem = null;
            StopCarryingPlayer(player);
        }
    }

    function StopCarryingPlayer(player) {
        var animation = player.GetAnimation();
        var currentAnimation = animation.currentAnimation;
        switch (currentAnimation) {
            case "carryingRight":
                player.MoveRight();
                break;
            case "carryingLeft":
                player.MoveLeft();
                break;
            case "carryingTop":
                player.MoveTop();
                break;
            case "carryingBottom":
                player.MoveBottom();
                break;
            case "standLiftingRight":
                player.StandRight();
                break;
            case "standLiftingLeft":
                player.StandLeft();
                break;
            case "standLiftingTop":
                player.StandTop();
                break;
            case "standLiftingBottom":
                player.StandBottom();
                break;
        }
    }

    function StopMovingPlayer(player) {
        var animation = player.GetAnimation();
        var currentAnimation = animation.currentAnimation;
        switch (currentAnimation) {
            case "walkingRight":
                player.StandRight();
                break;
            case "walkingLeft":
                player.StandLeft();
                break;
            case "walkingTop":
                player.StandTop();
                break;
            case "walkingBottom":
                player.StandBottom();
                break;
            case "carryingRight":
                player.StandLiftingRight();
                break;
            case "carryingLeft":
                player.StandLiftingLeft();
                break;
            case "carryingTop":
                player.StandLiftingTop();
                break;
            case "carryingBottom":
                player.StandLiftingBottom();
                break;
        }
    }
    
    function DropBomb(player, map) {
        var animation = player.GetAnimation();
        var bomb = new Bomb();
        bomb.Create();
        map.AddBomb(bomb, animation.x, animation.y);
    }

    function CarryAnItem(player, map) {
        var interactionCircle = player.GetInteractionCircle();
        var item = map.GetClosestItemToInteractWith(interactionCircle);
        if (item != null) {
            player.LiftingRight();
            carryingItem = item;
            carryingItem.animation.on("animationend", function (evt) {
                BombAnimationEnd(evt, player);
            });
        }
    }

    function GetAnimationFunctionByName(name) {
        for (var i = 0; i < mappingNameAnimation.length; i++) {
            var mapping = mappingNameAnimation[i];  
            if (name == mapping.animation) {
                return mapping.movement;
            }
        }

        return null;
    }

    function SwitchAnimation(player, direction) {
        var animation = player.GetAnimation();
        var currentAnimation = animation.currentAnimation;
        var animationName = null;
        var movement = null;

        if (carryingItem != null) {
            animationName = "carrying" + direction;
        } else {
            animationName = "walking" + direction;
        }

        if (currentAnimation != animationName) {
            movement = GetAnimationFunctionByName(animationName);
        }

        if (movement != null) {
            movement(player);
        }
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
        var currentAnimation = animation.currentAnimation;
        switch (keyCode) {
            case 39:
                SwitchAnimation(this.player, "Right");
                break;
            case 37:
                SwitchAnimation(this.player, "Left");
                break;
            case 38:
                SwitchAnimation(this.player, "Top");
                break;
            case 40:
                SwitchAnimation(this.player, "Bottom");
                break;
            case 66:
                if (carryingItem == null) {
                    DropBomb(this.player, this.map);
                }

                break;
            case 65:
                if (carryingItem == null) {
                    CarryAnItem(this.player, this.map);
                }

                break;
        }
    }

    PlayerController.prototype.ExecuteActionOnKeyUp = function (keyCode) {
        StopMovingPlayer(this.player);
    }

    return PlayerController;
});