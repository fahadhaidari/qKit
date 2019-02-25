qKit.init({
  color: '#111111',
  border: {
    width: 5,
    color: 'orange',
    radius: 4,
  }
});

const size = 20;
const numRows = 8;
const numCols = 8;

qKit.repeat(i => {
  qKit.repeat(j => {
    const quad = qKit.draw.quad({
      width: size,
      height: size,
      x: 120 + (j * size),
      y: 120 + (i * size),
      group: 'quads',
      color: qKit.util.randomColor(),
      extension: {
        speed: qKit.util.randomDouble(0.1, 0.1),
        vel: {
          x: qKit.util.randomInt(1, 10),
          y: qKit.util.randomInt(1, 10),
        }
      }
  });
  quad.alignToGrid(size);
  }, numCols)
}, numRows);

const quads = qKit.groups('quads');
const numQuads = quads.length;

qKit.update(() => {
  qKit.repeat(i => {
    const quad = quads[i];
    let { speed, vel } = quad.extension;
    vel.x += speed;
    vel.y += speed;

    quad.x += Math.cos(vel.x);
    quad.y += Math.sin(vel.y);
    quad.angle += Math.sin(vel.x * vel.y);
  }, numQuads)
});