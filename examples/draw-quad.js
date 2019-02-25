qKit.init();

// there are several ways a quad can be rendered

// 1
qKit.draw.quad();

// 2
qKit.draw.quad({
  x: 200,
  y: 250,
  z: 2,
  width: 40,
  height: 40,
  color: 'orange',
  isOutline: false,
});

// 3
const square = qKit.draw.quad();
square.x = 100;
square.y = 100;
square.width = 30;
square.height = 30;
square.color = '#4488FF';
square.isOutline = true;

// note that any property is optional

const rect = qKit.draw.quad({ width: 100, height: 20 });
rect.color = 'blue';
rect.center();
