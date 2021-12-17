//creates a class dedicated to the menu ui scene
class MenuUi extends Phaser.Scene {
    constructor() {
        super('MenuUi');
    }

    //pre loads the background image for the menu user interface
    preload() {
        this.load.image('Background', 'assets/game/MenuUi.png');
    }


    create() {
        //adds the background image into the scene
        this.add.image(400, 300, 'Background').setScale(0.9, 0.7);

        //declare variables local to the button function
        let Start;
        let Creds;

        //creates the credits button
        Creds = this.add.text(365, 323, "CREDITS", {fill: "black", fontsize: "100px", fontStyle: "bold"})
        Creds.setInteractive();

        //function that allows scene change after a left click
        Creds.on('pointerdown', function () {
            this.scene.start('Credits');
            this.scene.stop('MenuUi');
        }, this);

        //creates the start button
        Start = this.add.text(370, 273, "START", {fill: "black", fontsize: "100px", fontStyle: "bold"})
        Start.setInteractive();

        //function that allows scene change after a left click
        Start.on('pointerdown', function () {
            this.scene.start('Level1');
            this.scene.stop('MenuUi');
        }, this);

    }

}
