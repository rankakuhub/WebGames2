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
let score2 = 0;
let scoreText;
let scoreText2;
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
let wallsLayer;
let groundLayer;
let playerArrow;
let playerSword;
let control = false;
let worldBounds;
let inputCursor;
let mouse;
let spaceBar;
let shootKey;
let kills = 0;
let kills2 = 0;
let killText;
let killText2;
let sound;

//class dedicated to level 1 of the game with unique name
class Level1 extends Phaser.Scene {

    constructor() {
        super('Level1');
    }

    preload() {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();

        this.load.image('tiles', 'assets/game/Tilesheet.png');
        this.load.tilemapTiledJSON('map', 'assets/game/Finalmap.json');

        this.load.image('arrow', 'assets/game/ArrowAsset.png');
        this.load.image('sword', 'assets/game/sword.png');

        this.load.image('coin', 'assets/game/Coin.png');

        this.load.image('player1', 'assets/game/Isis Front Idle.png');
        this.load.image('player2', 'assets/game/Ra Front Idle.png');

        this.load.image('enemy1', 'assets/game/Enemy1.png')
        this.load.image('enemy2', 'assets/game/Enemy2.png')

        this.load.audio('music', 'assets/game/Enchantment (Loop).mp3');

        this.bullets = this.physics.add.group({
            defaultKey: 'arrow',
            maxSize: 10
        });

    }

    create() {


        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('Tilesheet', 'tiles');

        sound = this.sound.add('music',{volume: 0.075});
        sound.loop = true;
        sound.play();

        groundLayer = map.createLayer('ground', tileset, 0, 0);
        wallsLayer = map.createLayer('walls', tileset,0, 0);
        wallsLayer.setCollisionByProperty({collides: true})

/*        const debugGraphics = this.add.graphics().setAlpha(0.7)
        wallsLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        })*/

        //player 1 physics
        player1Sprite = this.physics.add.sprite(200, 500, 'player1');
        player1Sprite.setScale(2);

        //player 2 physics
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

        //display score text
        scoreText = this.add.text(16, 16, 'P1 score: 0', {fontSize: '32px', fill: '#FFFAFA'});
        scoreText2 = this.add.text(16, 16, 'P2 score: 0', {fontSize: '32px', fill: '#FFFAFA'});

        //adds the enemy physics
        enemy = this.physics.add.sprite(500, 550, 'enemy1');
        enemy.setScale(2);

        enemy2 = this.physics.add.sprite(950, 300, 'enemy1');
        enemy2.setScale(2);

        enemy3 = this.physics.add.sprite(1300, 300, 'enemy2');
        enemy3.setScale(2);

        enemy4 = this.physics.add.sprite(950, 800, 'enemy2');
        enemy4.setScale(2);

        enemy5 = this.physics.add.sprite(1300,800, 'enemy1');
        enemy5.setScale(2);

        enemy6 = this.physics.add.sprite(1765, 550, 'enemy2');
        enemy6.setScale(2);

        enemy7 = this.physics.add.sprite(1985, 550, 'enemy1');
        enemy7.setScale(2);

        enemy8 = this.physics.add.sprite(1125, 550, 'enemy1');
        enemy8.setScale(2);

        //display kill text
        killText = this.add.text(16, 16, 'P1 kills: 0', {fontSize: '32px', fill: '#FFFAFA'});
        killText2 = this.add.text(16, 16, 'P2 kills: 0', {fontSize: '32px', fill: '#FFFAFA'});

        //camera follow player1
        this.keys = this.input.keyboard.createCursorKeys();
        this.cameras.main.startFollow(player1Sprite);
        this.cameras.main.zoom = 1;
        inputCursor = this.input;

        //adds collision between player and walls
        this.physics.world.setBounds(0,0, 14000, 900000);
        player2Sprite.setCollideWorldBounds(true);
        player1Sprite.setCollideWorldBounds(true);
        worldBounds = this.physics.world.bounds;

        //player 1 weapon physics
        playerArrow = this.physics.add.sprite(player1Sprite.x,player1Sprite.y,'arrow');
        playerArrow.setScale(0)
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        mouse = this.input.mousePointer;


        playerSword = this.physics.add.sprite(player2Sprite.x,player2Sprite.y,'sword');
        playerSword.setScale(0)
        shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.physics.add.collider(player1Sprite, wallsLayer);
        this.physics.add.collider(player2Sprite, wallsLayer);



    }

        update() {
        //score text and kill text position player 1
        scoreText.x = player1Sprite.body.position.x;
        killText.x = player1Sprite.body.position.x;

            //score text and kill text position player 2 (fixes on player 1 as camera)
            scoreText2.x = player2Sprite.body.position.x;
            killText2.x = player2Sprite.body.position.x;


            //creates player 1 attack for arrow
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


            if(shootKey.isDown && control === false){
                //for fire again
                playerSword = this.physics.add.sprite(player2Sprite.x,player2Sprite.y,'sword');
                //move to mouse position
                this.physics.moveTo(playerSword,inputCursor.x,inputCursor.y, 250);
                playerSword.setScale(1);
                control = true;

            }

            if(playerSword.x > worldBounds.width || playerSword.y > worldBounds.height ||playerSword.x < 0 || playerSword.y < 0)
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

            this.physics.add.overlap(playerSword, enemy, this.destroy2,null,this);
            this.physics.add.overlap(playerSword, enemy2, this.destroy2,null,this);
            this.physics.add.overlap(playerSword, enemy3, this.destroy2,null,this);
            this.physics.add.overlap(playerSword, enemy4, this.destroy2,null,this);
            this.physics.add.overlap(playerSword, enemy5, this.destroy2,null,this);
            this.physics.add.overlap(playerSword, enemy6, this.destroy2,null,this);
            this.physics.add.overlap(playerSword, enemy7, this.destroy2,null,this);
            this.physics.add.overlap(playerSword, enemy8, this.destroy2,null,this);

        //coin pickup physics
        this.physics.add.overlap(player1Sprite, coin, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin, this.collectCoin2, null, this);

        this.physics.add.overlap(player1Sprite, coin2, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin2, this.collectCoin2, null, this);

        this.physics.add.overlap(player1Sprite, coin3, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin3, this.collectCoin2, null, this);

        this.physics.add.overlap(player1Sprite, coin4, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin4, this.collectCoin2, null, this);

        this.physics.add.overlap(player1Sprite, coin5, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin5, this.collectCoin2, null, this);

        this.physics.add.overlap(player1Sprite, coin6, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin6, this.collectCoin2, null, this);

        this.physics.add.overlap(player1Sprite, coin7, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin7, this.collectCoin2, null, this);

        this.physics.add.overlap(player1Sprite, coin8, this.collectCoin, null, this);
        this.physics.add.overlap(player2Sprite, coin8, this.collectCoin2, null, this);

        //score text position player 1
        scoreText.x = player1Sprite.body.position.x - 350;
        scoreText.y = player1Sprite.body.position.y - 250;

        //kill text position player 1
        killText.x = player1Sprite.body.position.x - -200;
        killText.y = player1Sprite.body.position.y - 250;

        //score text position player 2 (fixes on player 1 as camera)
        scoreText2.x = player1Sprite.body.position.x - 350;
        scoreText2.y = player1Sprite.body.position.y - 210;

        //kill text position player 2 (fixes onto player 1 as camera)
            killText2.x = player1Sprite.body.position.x - -200;
            killText2.y = player1Sprite.body.position.y - 210;

        //player 1 movement
        this.keys = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });

        if (this.keys.left.isDown) {
            player1Sprite.body.setVelocityX(-1);
            player1Sprite.x -= 1.5;
        }
        if (this.keys.right.isDown) {
            player1Sprite.body.setVelocityX(1);
            player1Sprite.x += 1.5;
        }
        if (this.keys.up.isDown) {
            player1Sprite.body.setVelocityY(-1);
            player1Sprite.y -= 1.5;
        }
        if (this.keys.down.isDown) {
            player1Sprite.body.setVelocityY(1);
            player1Sprite.y += 1.5;
        }

        //player 2 movement
        cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            player2Sprite.body.setVelocityX(-1);
            player2Sprite.x -= 1.5;
        }
        if (cursors.right.isDown) {
            player2Sprite.body.setVelocityX(1);
            player2Sprite.x += 1.5;
        }
        if (cursors.up.isDown) {
            player2Sprite.body.setVelocityY(-1);
            player2Sprite.y -= 1.5;
        }
        if (cursors.down.isDown) {
            player2Sprite.body.setVelocityY(1);
            player2Sprite.y += 1.5;
        }

        //enemy attacking stuff
       /* let angle2 = Phaser.Math.Angle.Between(enemy.x, enemy.y, player1Sprite.x, player1Sprite.y);
        enemy.setRotation(angle2);
        enemy.setRotation(angle2);
        enemy.setRotation(angle2 + Math.PI / 2);*/
    }
         //kill enemy and add 1 point to kill count player 1
         destroy(playerArrow,enemy) {
             enemy.disableBody(true, true);
             playerArrow.disableBody(true, true);
             control = false;
             kills += 1;
             killText.setText('P1 Kills: ' + kills);
         }

    destroy2(playerSword,enemy) {
        enemy.disableBody(true, true);
        playerSword.disableBody(true, true);
        control = false;
        kills2 += 1;
        killText2.setText('P2 Kills: ' + kills2);
    }

        //collect coin and add 10 points to score player 1
        collectCoin (player1Sprite, coin) {
            coin.disableBody(true, true);
            score += 10;
            scoreText.setText('P1 Score: ' + score);
        }

            //collect coin and add 10 points to score player 2
            collectCoin2 (player2Sprite, coin) {
                coin.disableBody(true, true);
                score2 += 10;
                scoreText2.setText('P2 Score: ' + score2);
        }
}