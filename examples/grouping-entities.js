qKit.init();

const square1 = qKit.draw.quad({
  x: 10,
  y: 10,
  group: 'squares',
});

const square2 = qKit.draw.quad({
  x: 60,
  y: 10,
  group: 'squares',
});

const square3 = qKit.draw.quad({
  x: 110,
  y: 10,
  group: 'squares',
});

const rect1 = qKit.draw.quad({
  x: 10,
  y: 100,
  width: 40,
  color: 'orange',
  group: 'rects',
});

const rect2 = qKit.draw.quad({
  x: 60,
  y: 100,
  width: 40,
  color: 'orange',
  group: 'rects',
});

const rect3 = qKit.draw.quad({
  x: 110,
  y: 100,
  width: 40,
  color: 'orange',
  group: 'rects',
});

// also can be done like this:
const rect4 = qKit.draw.quad({
  x: 170,
  y: 100,
  width: 40,
  color: 'orange',
});

rect4.addToGroup('rects');

// then entities can be accessed through their groups
const squares = qKit.groups('squares');
const rectangles = qKit.groups('rects');

console.log('Squares ~~>', squares);
console.log('Rectangles ~~>', rectangles);

// the above also applied on images and sprites
