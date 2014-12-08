define({
    id: "actions",
    src: ["images/action_icon.png"],
    spriteData: {
        frames: [
            // Init
            [14, 0, 46, 24, 0],
            // Carry
            [14, 192, 46, 24, 0],
            // Throw
            [14, 216, 46, 24, 0]
        ],
        animations: {
            init: [0],
            carry: [1],
            drop: [2]
        }
    }
});