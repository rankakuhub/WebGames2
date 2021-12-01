const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0}
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },

};

const game = new Phaser.Game(config);

    function preload()
    {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();

        this.load.image('ground', '../assets/game/images/Level2_Ground.png');
        this.load.image('walls', '../assets/game/images/Level2_Walls.png');

        this.load.image('coin', '../assets/game/images/Coin.png');

        this.load.image('player1', '../assets/game/images/Isis Front Idle.png');
        this.load.image('player2', '../assets/game/images/Ra Front Idle.png');
    }

var player1Sprite;
var player2Sprite;
var coin;
var score = 0;
var scoreText;

    function create()
    {
        this.add.image(0,0, 'ground').setOrigin(0,0);
        this.add.image(0,0, 'walls').setOrigin(0,0);

        player1Sprite = this.physics.add.sprite(200, 500, 'player1');
        player1Sprite.setScale(2);

        player2Sprite = this.physics.add.sprite(200, 600, 'player2');
        player2Sprite.setScale(2);

        //collect coins/combined score
        coin = this.physics.add.sprite(400, 500, 'coin');
        coin2 = this.physics.add.sprite(400, 700, 'coin');
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFFAFA' });

        //camera follow player1
        this.cameras.main.startFollow(player1Sprite);
        this.cameras.main.zoom = 1;

    }

function update(){

        //collect coins - for both players
        scoreText.x = player1Sprite.body.position.x;
        this.physics.add.overlap(player1Sprite, coin, collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin, collectCoin, null, this);

        this.physics.add.overlap(player1Sprite, coin2, collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin2, collectCoin, null, this);

        //score text position
        scoreText.x = player1Sprite.body.position.x -350;
        scoreText.y = player1Sprite.body.position.y -250;


        //player 1 movement
        this.keys = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
                down:Phaser.Input.Keyboard.KeyCodes.S,
                left:Phaser.Input.Keyboard.KeyCodes.A,
                right:Phaser.Input.Keyboard.KeyCodes.D});

        if (this.keys.left.isDown) {
            player1Sprite.x -= 2;
        }
        if (this.keys.right.isDown) {
            player1Sprite.x += 2;
        }
        if (this.keys.up.isDown) {
            player1Sprite.y -= 2;
        }
        if (this.keys.down.isDown) {
            player1Sprite.y += 2;
        }

        //player 2 movement
        cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            player2Sprite.x -= 2;
        }
        if (cursors.right.isDown) {
            player2Sprite.x += 2;
        }
        if (cursors.up.isDown) {
            player2Sprite.y -= 2;
        }
        if (cursors.down.isDown) {
            player2Sprite.y += 2;
        }
}

//add player scores
function collectCoin (player1Sprite, coin)
{
    coin.disableBody(true, true);

    score += 5;
    scoreText.setText('Score: ' + score);
}
