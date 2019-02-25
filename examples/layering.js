qKit.init();

const square = qKit.draw.quad({
  width: 40,
  height: 40,
  color: 'red',
});

const rect = qKit.draw.quad({
  width: 140,
  height: 10,
  color: 'green',
});

square.center();
rect.center();

// now the rectangle is rendered above the square

// you can easily set the z index of the square to be above the rectangle:
// square.z = 10;

// or
// square.z = rect.z + 1;
