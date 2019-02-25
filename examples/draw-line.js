qKit.init();

// 1
qKit.draw.line({
  p1: {
    x: 10,
    y: 10
  },
  p2: {
    x: 200,
    y: 200
  },
  color: 'red',
  width: 4,
});

// 2
const line = qKit.draw.line();

line.p1.x = 250;
line.p1.y = 200;
line.p2.x = 10;
line.p2.y = 300;
line.color = '#DDDDDD';
line.width = 2;

// note that all params are optional
// however, p1 and p2 need to be passed, otherwise, no line will be rendered
// since p1 = 0 and p2 = 0
