qKit.init();

const shape = qKit.draw.quad({ width: 20, height: 20, color: 'cyan' });
shape.center();

const rectangle = qKit.draw.quad({ width: 50, height: 10, x: 150, y: 50, color: 'red'});


qKit.input.click(e => {
  const mouseX = e.mouseX;
  const mouseY = e.mouseY;

  if (e.target) {
    const _shape = e.target;
    console.log('target', _shape);
  }
  console.log(`MouseX ${mouseX}`);
  console.log(`MouseY ${mouseY}`);
});

qKit.input.mouseMove(e => {
  console.log('The Mouse is moving...');
  rectangle.x = e.mouseX;
  rectangle.y = e.mouseY;
});
