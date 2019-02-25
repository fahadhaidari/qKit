qKit.init();


const p1 = { x: 10, y: 10 };
const p2 = { x: 200, y: 200 };

const angle = qKit.util.getAngle(p1, p2);
const distance = qKit.util.getDistance(p1, p2);
const trigs = qKit.util.getTrigs(p1, p2);

console.log('Angle:', angle);
console.log('Distance:', distance);
console.log('Trigs components:', trigs);

// note that similar to the above you can get similar info from
// quads, images, and sprites

const quad1 = qKit.draw.quad({
  x: p1.x,
  y: p1.y,
  color: 'blue',
});

const quad2 = qKit.draw.quad({
  x: p2.x,
  y: p2.y,
  color: 'red',
});

const angleToQuad2 = quad1.angleTo(quad2);
const distanceToQuad2 = quad1.angleTo(quad2);
const trigsToQuad2 = quad1.trigsTo(quad2);

console.log('Angle between Quad1 and Quad2:', angleToQuad2);
console.log('Distance between Quad2 and Quad2:', distanceToQuad2);
console.log('Trigs components between Quad1 and Quad2:', trigsToQuad2);
