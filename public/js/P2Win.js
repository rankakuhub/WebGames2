//create a class dedicated to the player 2 win scene
class P2Win extends Phaser.Scene {
    constructor() {
        super('P2Win');
    }

    //pre loads the background image
    preload() {
        this.load.image('Win2', 'assets/game/Player2Wins.png');
    }

    create() {
        //adds the background image into the scene
        this.add.image(400, 300, 'Win2').setScale(0.9, 0.7);

        //declare variables local to the button function
        let exit;

        //creates the exit button
        exit = this.add.text(682, 15, "EXIT", {fill: "black", fontsize: "100px", fontStyle: "bold"})
        exit.setInteractive();

        //function that allows scene change after a left click
        exit.on('pointerdown', function () {
            this.scene.start('MenuUi');
            this.scene.stop('P2Win');
        }, this);
    }
}