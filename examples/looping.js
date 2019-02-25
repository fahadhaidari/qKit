qKit.init();

const numLoops = 8;

qKit.repeat(i => {
  qKit.draw.quad({
    x: 5 + i * (40),
    y: 200,
    color: qKit.util.randomColor()
  })
}, numLoops);
