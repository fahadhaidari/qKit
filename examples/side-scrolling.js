qKit.init({
  color: '#222222',
  border: {
    radius: 2,
    width: 2,
    color: '#DDDDDD'
  }
});

let distance = 0;

const buildGround = function() {
  const size = 20;

  qKit.repeat(i => {
    const piece = qKit.draw.quad({
      x: i * (size + 2),
      y: qKit.screen.height - size,
      width: size,
      height: size,
      color: '#FF7777',
      group: 'ground',
    });
  }, 20);
}

const player = qKit.draw.quad({
  x: 150,
  y: qKit.screen.height / 2,
  width: 30,
  height: 10,
  color: 'orange',
  z: 2,
  extension: {
    speed: 5,
  }
});

const distanceText = qKit.draw.text({ text: `Distance: ${distance}`, x: 2, color: '#EEEEEE' });
qKit.draw.text({ text: 'Press any key to switch direction', x: 2, y: 20, color: '#EEEEEE', size: 12 });

buildGround();

const groundPieces = qKit.groups('ground');
const pieceLen = groundPieces.length;

qKit.update(() => {
  distance ++;
  distanceText.text = `Distance: ${parseInt((distance + 1) / 10)}`;

  player.y += player.extension.speed;

  if (player.y < 0 || player.y + player.height > qKit.screen.height - 20) {
    player.extension.speed *= -1;
  }

  qKit.repeat(i => {
    const piece = groundPieces[i];

    piece.x -= 1;
    if (piece.x < -piece.width) piece.x = qKit.screen.width;
  
  }, pieceLen);
});

qKit.input.keyUp(keyCode => {
  player.extension.speed *= -1;
});