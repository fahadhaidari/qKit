qKit.init();

const quad1 = qKit.draw.quad({
  width: 50,
  height: 50,
  color: '#4466FF',
  z: 2,
});

const quad2 = qKit.draw.quad({
  x: 250,
  y: 250,
  width: 100,
  height: 60,
  color: '#FF4444'
});

quad2.center();

qKit.input.mouseMove(e => {
  quad1.x = e.mouseX - quad1.width / 2;
  quad1.y = e.mouseY - quad1.height / 2;

  const isColliding = qKit.collision.test(quad1, quad2);

  if (isColliding) quad1.color = '#DDDDDD';
  else quad1.color = '#4466FF';
});