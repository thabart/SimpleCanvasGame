define({
    id: "bomb",
    src: ["images/bomb.png", "images/explosion.png"],
    hitCircle : {
        rx: 8,
        ry: 8,
        radius: 8
    },
    damageCircle: {
        rx: 8,
        ry: 9,
        radius: 24
    },
    interactionCircle : {
        radius: 10,
        rx: 8,
        ry: 8
    },
    spriteData: {
        frames: [
            // Drop
            [0, 0, 16, 16, 0],
            [16, 0, 16, 16, 0],

            // Before explod
            [32, 0, 16, 16, 0],
            [48, 0, 16, 16, 0],

            // Explod
            [0, 0, 48, 48, 1, 16, 16],
            [48, 0, 48, 48, 1, 16, 16],
            [96, 0, 48, 48, 1, 16, 16],
            [144, 0, 48, 48, 1, 16, 16],
            [192, 0, 48, 48, 1, 16, 16]
        ],
        animations: {
            drop: [0, 1, "drop", 0.03],
            beforeExplod: [2, 3, "beforeExplod", 0.08],
            explod: [4, 8, "explod", 0.2]
        }
    }
});