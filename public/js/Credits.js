//create a class dedicated to the credits scene
class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
    }

    //pre loads the background image
    preload() {
        this.load.image('Background1', 'assets/game/CredsBground.png');
    }


    create() {
        //adds the background image into the scene
        this.add.image(400, 300, 'Background1').setScale(0.9, 0.7);

        //declare variables local to the button function
        let exit;
        let creds =["Thank you for playing Anubis Playhouse",
            "",
            "Emma Westland:",
            "Character Design, Menu UI, Credits UI",
            "",
            "Eryn Riddel:",
            "Enemy Design",
            "",
            "Darren Boyd:",
            "Level Design, Player Controls, Enemy Controls",
            "",
            "Kyle Gibson",
            "Level Design, Website Design"];

        //creates the exit button
        exit = this.add.text(682, 15, "EXIT", {fill: "black", fontsize: "100px", fontStyle: "bold"})
        exit.setInteractive();

        //function that allows scene change after a left click
        exit.on('pointerdown', function () {
            this.scene.start('MenuUi');
            this.scene.stop('Credits');
        }, this);

        //displays the text from the creds variable
        creds = this.add.text(200, 100, creds, {fill: "black", fontsize: "200px", fontStyle: "bold"})
    }

}