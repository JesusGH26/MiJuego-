const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#1d1d1d',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

let player;
let stars;
let score = 0;
let scoreText;

const game = new Phaser.Game(config);

function preload() {
  this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
  this.load.image('star', 'https://labs.phaser.io/assets/demoscene/star2.png');
}

function create() {
  player = this.physics.add.sprite(400, 300, 'player').setScale(0.5);
  player.setCollideWorldBounds(true);

  stars = this.physics.add.group({
    key: 'star',
    repeat: 10,
    setXY: { x: 50, y: 50, stepX: 70 }
  });

  stars.children.iterate(star => {
    star.setBounce(1);
    star.setCollideWorldBounds(true);
    star.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
  });

  this.physics.add.overlap(player, stars, collectStar, null, this);

  scoreText = this.add.text(16, 16, 'Puntos: 0', { fontSize: '24px', fill: '#fff' });
}

function update() {
  const pointer = this.input.activePointer;
  player.x = pointer.x;
  player.y = pointer.y;
}

function collectStar(player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText('Puntos: ' + score);
}