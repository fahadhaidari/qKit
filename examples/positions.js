qKit.init({ color: '#DDDDDD' });

const shape = qKit.draw.quad({
  x: 200,
  y: 200,
  width: 40,
  height: 40,
  color: '#222222',
});

console.log('Top point', shape.getTop());
console.log('TopLeft point', shape.getTopLeft());
console.log('TopRight point', shape.getTopRight());
console.log('Center point', shape.getCenter());
console.log('Bottom point', shape.getBottom());
console.log('BottomLeft point', shape.getBottomLeft());
console.log('BottomRight point', shape.getBottomRight());
console.log('Left point', shape.getLeft());
console.log('Right point', shape.getRight());

// you can center an entity as below
shape.center();

// Note: the above can be applied on sprites and images as well

// the returned point is an object of two props, x and y
