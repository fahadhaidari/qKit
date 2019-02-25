qKit.init();

const quad1 = qKit.draw.quad({
  x: 210,
  y: 210,
  width: 60,
  height: 50,
  color: '#4466FF'
});

const quad2 = qKit.draw.quad({
  x: 250,
  y: 250,
  width: 60,
  height: 60,
  color: '#FF4444'
});

const isColliding = qKit.collision.test(quad1, quad2);

console.log('IsColliding:', isColliding); // should be true

// let's change their positions so they should not collide any more
quad2.x += 25;

console.log('IsColliding:', qKit.collision.test(quad1, quad2)); // should be false
