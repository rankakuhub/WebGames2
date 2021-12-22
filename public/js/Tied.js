//create a class dedicated to the tied scene
class Tied extends Phaser.Scene {
    constructor() {
        super('Tied');
    }

    //pre loads the background image
    preload() {
        this.load.image('Tie', 'assets/game/PlayerTied.png');
    }

    create() {
        //adds the background image into the scene
        this.add.image(400, 300, 'Tie').setScale(0.9, 0.7);

        //declare variables local to the button function
        let exit;

        //creates the exit button
        exit = this.add.text(682, 15, "EXIT", {fill: "black", fontsize: "100px", fontStyle: "bold"})
        exit.setInteractive();

        //function that allows scene change after a left click
        exit.on('pointerdown', function () {
            this.scene.start('MenuUi');
            this.scene.stop('Tied');
        }, this);
    }
}