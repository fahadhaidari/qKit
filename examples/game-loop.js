qKit.init();

const quad = qKit.draw.quad();

qKit.update(() => {
  console.log('Game is updating...');
  quad.x ++;
  quad.y ++;
  quad.angle ++;
})
