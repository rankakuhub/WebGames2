const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 0},
        }
    },

    scene: [MenuUi, Credits, Level1, P1Win, P2Win, Tied],
};

let game = new Phaser.Game(config);