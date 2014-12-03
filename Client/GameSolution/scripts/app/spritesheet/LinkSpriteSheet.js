define({
    id: "link",
    src: ["images/walking.tunic.png", "images/lifting.png", "images/carrying.png"],
    hitCircle : {
        rx: 12,
        ry: 12.5,
        radius: 10
    },
    interactionCircle: {
        rx: 12,
        ry: 12.5,
        radius: 10
    },
    spriteData: {
        frames: [
            // Walking right
            [0, 8, 24, 25, 0],
            [24, 8, 24, 25, 0],
            [48, 8, 24, 25, 0],
            [72, 8, 24, 25, 0],
            [96, 8, 24, 25, 0],
            [120, 8, 24, 25, 0],
            [144, 8, 24, 25, 0],
            [168, 8, 24, 25, 0],
            // Walking top
            [0, 39, 24, 25, 0],
            [24, 39, 24, 25, 0],
            [48, 39, 24, 25, 0],
            [72, 39, 24, 25, 0],
            [120, 39, 24, 25, 0],
            [144, 39, 24, 25, 0],
            [168, 39, 24, 25, 0],
            // Walking left
            [0, 104, 24, 25, 0],
            [24, 104, 24, 25, 0],
            [48, 104, 24, 25, 0],
            [72, 104, 24, 25, 0],
            [120, 104, 24, 25, 0],
            [144, 104, 24, 25, 0],
            [168, 104, 24, 25, 0],
            // Walking top
            [0, 135, 24, 25, 0],
            [24, 135, 24, 25, 0],
            [48, 135, 24, 25, 0],
            [72, 135, 24, 25, 0],
            [120, 135, 24, 25, 0],
            [144, 135, 24, 25, 0],
            [168, 135, 24, 25, 0],
            // Lifting right
            [9, 0, 34, 24, 1],
            [57, 0, 34, 24, 1],
            [105, 0, 34, 24, 1],
            [153, 0, 34, 24, 1],
            [203, 0, 34, 24, 1],
            // Carrying right
            [0, 0, 24, 24, 2],
            [24, 0, 24, 24, 2],
            [48, 0, 24, 24, 2],
            // Carrying left
            [72, 0, 24, 24, 2],
            [96, 0, 24, 24, 2],
            [120, 0, 24, 24, 2],
            // Carrying top
            [0, 24, 24, 24, 2],
            [24, 24, 24, 24, 2],
            [48, 24, 24, 24, 2],
            [72, 24, 24, 24, 2],
            [96, 24, 24, 24, 2],
            [120, 24, 24, 24, 2],
            // Carrying bottom
            [0, 48, 24, 24, 2],
            [24, 48, 24, 24, 2],
            [48, 48, 24, 24, 2],
            [72, 48, 24, 24, 2],
            [96, 48, 24, 24, 2],
            [120, 48, 24, 24, 2]
        ],
        animations: {
            walkingRight: [0, 7, "walkingRight", 0.4],
            walkingTop: [8, 14, "walkingTop", 0.4],
            walkingLeft: [15, 21, "walkingLeft", 0.4],
            walkingBottom: [22, 28, "walkingBottom", 0.4],
            standRight: [0],
            standTop: [8],
            standLeft: [15],
            standBottom: [22],
            LiftingRight: [29, 33, "LiftingRight", 0.4],
            standLiftingRight: [34],
            standLiftingLeft: [37],
            standLiftingTop: [40],
            standLiftingBottom: [46],
            carryingRight: [34, 36, "carryingRight", 0.4],
            carryingLeft: [37, 39, "carryingLeft", 0.4],
            carryingTop: [40, 45, "carryingTop", 0.4],
            carryingBottom: [46, 51, "carryingBottom", 0.4]
        }
    }
});