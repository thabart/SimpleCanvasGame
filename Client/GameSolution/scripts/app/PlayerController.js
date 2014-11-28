
define([
    "app/plugins/Player",
    "app/plugins/Bomb"
], function (Player, Bomb, collisionEngine) {

    // Private fields.
    var speed;

    // Constructor
    function PlayerController(map) {
        this.player = new Player();
        this.player.Create();
        speed = this.player.GetSpeed();

        this.map = map;
        this.map.AddPlayer(this.player);
    }

    function CalculateNewPlayerPosition(animation, hitCircleShape) {
        var result = {
            x : animation.x,
            y: animation.y,
            hitCircleX: hitCircleShape.x,
            hitCircleY: hitCircleShape.y
        };
        var currentAnimation = animation.currentAnimation;

        switch (currentAnimation) {
            case "walkingRight":
                result.x += speed;
                result.hitCircleX += speed;
                break;
            case "walkingLeft":
                result.x -= speed;
                result.hitCircleX -= speed;
                break;
            case "walkingUp":
                result.y -= speed;
                result.hitCircleY -= speed;
                break;
            case "walkingDown":
                result.y += speed;
                result.hitCircleY += speed;
                break;
        }

        return result;
    }

    PlayerController.prototype.RefreshPosition = function () {
        var animation = this.player.GetAnimation();
        var hitCircleShape = this.player.hitCircleShape;
        var newPosition = CalculateNewPlayerPosition(animation, hitCircleShape);
        var hitCircle = this.player.GetHitCircle();
        hitCircle.x = newPosition.hitCircleX;
        hitCircle.y = newPosition.hitCircleY;
        
        if (!this.map.CheckCollision(hitCircle)) {
            animation.x = newPosition.x;
            hitCircleShape.x = newPosition.hitCircleX;
            animation.y = newPosition.y;
            hitCircleShape.y = newPosition.hitCircleY;
        }
    }

    PlayerController.prototype.ExecuteActionOnKeyDown = function (keyCode, stage) {
        var animation = this.player.GetAnimation();
        var currentAnimation = animation.currentAnimation;
        switch (keyCode) {
            case 39:
                if (currentAnimation != "walkingRight") {
                    this.player.MoveRight();
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
        }
    }

    return PlayerController;
});