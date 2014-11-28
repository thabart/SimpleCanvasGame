define(function () {

    function CalculeEulerDistance(firstCircle, secondCircle) {
        var xf = firstCircle.x,
            xs = secondCircle.x,
            yf = firstCircle.y,
            ys = secondCircle.y;

        return Math.sqrt(Math.pow(xs - xf, 2) + Math.pow(ys - yf, 2));
    }

    function CheckIntersectionOfTwoCircle(firstCircle, secondCircle) {
        var radiusf = firstCircle.radius,
            radiuss = secondCircle.radius;

        var distance = CalculeEulerDistance(firstCircle, secondCircle);
        return Math.abs(radiuss - radiusf) < distance &&
            distance < radiuss + radiusf;
    }

    function CheckCircleContainsCircle(firstCircle, secondCircle) {
        var distance = CalculeEulerDistance(firstCircle, secondCircle);
        var radiusf = firstCircle.radius,
            radiuss = secondCircle.radius;
        var maxRadius = Math.max(radiusf, radiuss);
        var minRadius = Math.min(radiusf, radiuss);
        return distance + minRadius <= maxRadius;
    }

    return {
        CheckCollision: function (entities, shape) {
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                var entityCircleShape = entity.GetHitCircle();
                if (CheckIntersectionOfTwoCircle(entityCircleShape, shape) ||
                    CheckCircleContainsCircle(entityCircleShape, shape)) {
                    return true;
                }
            }

            return false;
        }
    };
});