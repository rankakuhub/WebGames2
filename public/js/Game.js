// Level class location
let player1Sprite;
let player2Sprite;
let coin;
let coin2;
let score = 0;
let scoreText;
let cursors;
let enemy;
let map;
let wallsLayer;
let playerArrow;
let control = false;
let worldBounds;
let inputCursor;
let mouse;
let spaceBar;
let kills = 0;
let killText;

class Level1 extends Phaser.Scene {

    constructor() {
        super('Level1');
    }

    preload() {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();

        this.load.image('ground', 'assets/game/Level2_Ground.png');
        this.load.image('walls', 'assets/game/Level2_Walls.png');

        this.load.image('arrow', 'assets/game/ArrowAsset.png');

        this.load.image('tiles', 'assets/game/WGD2-Tilesheet2.2.png')
        this.load.image('tiles2', 'assets/game/WGD2-Tilesheet_Walls2.1.png')
        this.load.tilemapTiledJSON('tilemap', 'assets/game/Level_2.json')

        this.load.image('coin', 'assets/game/Coin.png');

        this.load.image('player1', 'assets/game/Isis Front Idle.png');
        this.load.image('player2', 'assets/game/Ra Front Idle.png');

        this.load.image('enemy', 'assets/game/Enemy_Placeholder.png')
    }

    create() {
        const map = this.make.tilemap({key: 'tilemap'})
        const tileset1 = map.addTilesetImage('WGD2-Tilesheet2.2', 'tiles')
        const tileset2 = map.addTilesetImage('WGD2-Tilesheet_Walls2.1', 'tiles2')

        map.createStaticLayer('Ground', tileset1)
        wallsLayer = map.createStaticLayer('Walls', tileset2)

        wallsLayer.setCollisionByProperty({collides: true})

        const debugGraphics = this.add.graphics().setAlpha(0.7)
        wallsLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        })

        this.add.image(0,0, 'ground').setOrigin(0,0);
        this.add.image(0, 0, 'walls').setOrigin(0, 0);

        player1Sprite = this.physics.add.sprite(200, 500, 'player1');
        player1Sprite.setScale(2);

        player2Sprite = this.physics.add.sprite(200, 600, 'player2');
        player2Sprite.setScale(2);
        //collect coins/combined score
        coin = this.physics.add.sprite(400, 500, 'coin');
        coin2 = this.physics.add.sprite(400, 700, 'coin');
        scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#FFFAFA'});



        enemy = this.physics.add.sprite(500, 600, 'enemy');
        enemy.setScale(0.75);
        killText = this.add.text(16, 16, 'kills: 0', {fontSize: '32px', fill: '#FFFAFA'});

        //camera follow player1
        this.keys = this.input.keyboard.createCursorKeys();
        this.cameras.main.startFollow(player1Sprite);
        this.cameras.main.zoom = 1;
        inputCursor = this.input;

        this.physics.add.collider(player1Sprite, wallsLayer);
        worldBounds = this.physics.world.bounds;

        playerArrow = this.physics.add.sprite(player1Sprite.x,player1Sprite.y,'arrow');
        playerArrow.setScale(0)
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        mouse = this.input.mousePointer;

    }

        update() {

        scoreText.x = player1Sprite.body.position.x;

        killText.x = player1Sprite.body.position.x;
        //collect coins - for both players

            if(spaceBar.isDown && control === false){
                //for fire again
                playerArrow = this.physics.add.sprite(player1Sprite.x,player1Sprite.y,'arrow');
                //move to mouse position
                this.physics.moveTo(playerArrow,inputCursor.x,inputCursor.y, 250);
                playerArrow.setScale(1);
                control = true;

            }

            if(playerArrow.x > worldBounds.width || playerArrow.y > worldBounds.height ||playerArrow.x < 0 || playerArrow.y < 0)
            {
                control = false;
            }

            this.physics.add.overlap(playerArrow, enemy, this.destroy,null,this);

        this.physics.add.overlap(player1Sprite, coin, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin, this.collectCoin, null, this);

        this.physics.add.overlap(player1Sprite, coin2, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin2, this.collectCoin, null, this);

        //score text position
        scoreText.x = player1Sprite.body.position.x - 350;
        scoreText.y = player1Sprite.body.position.y - 250;

        killText.x = player1Sprite.body.position.x - -250;
        killText.y = player1Sprite.body.position.y - 250;

        //player 1 movement
        this.keys = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });

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

        //enemy attacking stuff
        let angle2 = Phaser.Math.Angle.Between(enemy.x, enemy.y, player1Sprite.x, player1Sprite.y);
        enemy.setRotation(angle2);
        enemy.setRotation(angle2);
        enemy.setRotation(angle2 + Math.PI / 2);
    }

         destroy(playerArrow,enemy,) {
             enemy.disableBody(true, true);
             playerArrow.disableBody(true, true);
             control = false;
             kills += 1;
             killText.setText('Kills: ' + kills);
         }

//add player scores
        collectCoin (player1Sprite, coin) {
        coin.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);
    }
}