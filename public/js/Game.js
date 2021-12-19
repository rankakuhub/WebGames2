// Level class location
let player1Sprite;
let player2Sprite;
let coin;
let coin2;
let coin3;
let coin4;
let coin5;
let coin6;
let coin7;
let coin8;
let score = 0;
let scoreText;
let cursors;
let enemy;
let enemy2;
let enemy3;
let enemy4;
let enemy5;
let enemy6;
let enemy7;
let enemy8;
let map;
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

        this.load.image('ground', '../assets/game/images/Level2_Ground.png');
        this.load.image('walls', '../assets/game/images/Level2_Walls.png');

        this.load.image('arrow', '../assets/game/images/ArrowAsset.png');

        this.load.image('tiles', '../assets/game/images/WGD2-FinalTilesheet.png')
        this.load.tilemapTiledJSON('tilemap', '../assets/game/images/Level2_Final.json')

        this.load.image('coin', '../assets/game/images/Coin.png');

        this.load.image('player1', '../assets/game/images/Isis Front Idle.png');
        this.load.image('player2', '../assets/game/images/Ra Front Idle.png');

        this.load.image('enemy', '../assets/game/images/Enemy_Placeholder.png')
    }

    create() {
        const map = this.make.tilemap({key: 'tilemap'})
        const tileset = map.addTilesetImage('WGD2 - FinalTilesheet', 'tiles')


        map.createStaticLayer('Ground', tileset)
        const wallsLayer = map.createStaticLayer('Walls', tileset)

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
        coin = this.physics.add.sprite(1125, 200, 'coin');
        coin2 = this.physics.add.sprite(1125, 900, 'coin');
        coin3 = this.physics.add.sprite(475, 300, 'coin');
        coin4 = this.physics.add.sprite(475, 800, 'coin');
        coin5 = this.physics.add.sprite(1765, 800, 'coin');
        coin6 = this.physics.add.sprite(1765, 300, 'coin');
        coin7 = this.physics.add.sprite(1500, 550, 'coin');
        coin8 = this.physics.add.sprite(750, 550, 'coin');
        scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#FFFAFA'});



        enemy = this.physics.add.sprite(500, 550, 'enemy');
        enemy.setScale(0.75);

        enemy2 = this.physics.add.sprite(950, 300, 'enemy');
        enemy2.setScale(0.75);

        enemy3 = this.physics.add.sprite(1300, 300, 'enemy');
        enemy3.setScale(0.75);

        enemy4 = this.physics.add.sprite(950, 800, 'enemy');
        enemy4.setScale(0.75);

        enemy5 = this.physics.add.sprite(1300,800, 'enemy');
        enemy5.setScale(0.75);

        enemy6 = this.physics.add.sprite(1765, 550, 'enemy');
        enemy6.setScale(0.75);

        enemy7 = this.physics.add.sprite(1985, 550, 'enemy');
        enemy7.setScale(0.75);

        enemy8 = this.physics.add.sprite(1125, 550, 'enemy');
        enemy8.setScale(0.75);
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

            //kill enemies
            this.physics.add.overlap(playerArrow, enemy, this.destroy,null,this);
            this.physics.add.overlap(playerArrow, enemy2, this.destroy,null,this);
            this.physics.add.overlap(playerArrow, enemy3, this.destroy,null,this);
            this.physics.add.overlap(playerArrow, enemy4, this.destroy,null,this);
            this.physics.add.overlap(playerArrow, enemy5, this.destroy,null,this);
            this.physics.add.overlap(playerArrow, enemy6, this.destroy,null,this);
            this.physics.add.overlap(playerArrow, enemy7, this.destroy,null,this);
            this.physics.add.overlap(playerArrow, enemy8, this.destroy,null,this);

        //coin pickup
        this.physics.add.overlap(player1Sprite, coin, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin, this.collectCoin, null, this);

        this.physics.add.overlap(player1Sprite, coin2, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin2, this.collectCoin, null, this);

        this.physics.add.overlap(player1Sprite, coin3, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin3, this.collectCoin, null, this);

        this.physics.add.overlap(player1Sprite, coin4, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin4, this.collectCoin, null, this);

        this.physics.add.overlap(player1Sprite, coin5, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin5, this.collectCoin, null, this);

        this.physics.add.overlap(player1Sprite, coin6, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin6, this.collectCoin, null, this);

        this.physics.add.overlap(player1Sprite, coin7, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin7, this.collectCoin, null, this);

        this.physics.add.overlap(player1Sprite, coin8, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin8, this.collectCoin, null, this);

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

         destroy(playerArrow,enemy) {
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