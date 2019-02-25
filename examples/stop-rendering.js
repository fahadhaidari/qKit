qKit.init();


const rect = qKit.draw.quad({
  width: 200,
  color: 'blue',
  y: 200,
});

// this will stop rendering the rectangle
rect.isRender = false;
