# **`qKit`**
### **Author**: Fahad Haidari

**`qKit`** is an open source JavaScript 2D rendering library that renders quadratic shapes.

It renders:

1. **Squares**
2. **Rectangles**
3. **Sprites**
4. **Texts (no collision)**
5. **Lines (no collision)**

## **How to use `qKit`**
Simply, include `qKit.js` in the main html file

```
<script src="qKit.js"></script>
```

## **Running the Examples**
In the `index.html` file, comment/uncomment the desired example to run it.
You can view all code examples in the examples directory, or you can go through the README here.

## **Start `qKit`**

```
qKit.init({
  color: '#111111',
  width: 300,
  height: 250,
  border: {
    width: 8,
    color: '#FF5555',
    radius: 4
  }
});

// note that all props are optional and can simply be started as below

// qKit.init();

//  or pass any prop as desired
```

## **Draw a Quad (Square or Rectangle)**

```
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
```

## **Draw an Image**

```
qKit.init();

qKit.draw.image({ src: 'img.png' });

const image = qKit.draw.image({
  src: 'img.png',
  x: 100,
  y: 150,
  width: 40,
  height: 40,
})
```

## **Render a Text**

```
qKit.init();

qKit.draw.text({
  text: 'qKit',
  x: 160,
  y: 200,
  color: 'yellow',
  size: 40,
  family: 'Arial Black'
});

let score = 0;

const scoreText = qKit.draw.text();
scoreText.text = 'Score: ';
scoreText.color = 'orange';
scoreText.family = 'Arial Black';
score ++;

scoreText.text += score;
```

## **Render Sprites with Animations**

```
qKit.init();

// this will load the SPrite Sheet
const spriteSheet = qKit.draw.spriteSheet({
	src: 'sprite-sheet.png',
	width: 48, // width of the sprite sheet
	height: 72, // height of the sprite sheet
	rows: 4, // number of frames on each row in the sprite sheet image
	cols: 3, // number of frames on each columns in the sprite sheet image
});

// create a new MovieClip (animation)
spriteSheet.movieClip({
	name: 'side-run',
	frames: [[3, 0], [3, 1], [3, 2]],
	isLoop: true,
  isReturnToDefaultMovieClip: false,
});
// multiple animations can be created

const sprite = spriteSheet.add({
	scale: 2,
	delay: 1,
	movieClip: {
		name: 'default1',
		isLoop: true,
		frames: [[0, 0], [0, 1], [0, 2]],
	},
	x: 180,
	y: 218,
	delay: 5,
	dirX: 1,
	dirY: 1,
	showCollider: true
});

// after clicking on the sprite it will play "side-run" animation
// which was created on line 13
qKit.input.click(e => {
  if (e.target) {
    const sprite = e.target;
    sprite.playMovieClip('side-run');

    // sprite.playNextFrame(); // render next frame manually
    // sprite.playPreviousFrame(); // render previous frame manually
  }
});
```

## **Draw Lines**

```
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
```

## **Mouse Inputs**

```
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
```

## **Keyboard Inputs**

```
qKit.init();

qKit.input.keyDown(keyCode => {
  console.log('KeyDown ~~>', keyCode);
});

qKit.input.keyUp(keyCode => {
  console.log('KeyUp ~~>', keyCode);
});
```

## **Using Randoms**

```
qKit.init();

// integer random
const int = qKit.util.randomInt(2, 50);

// double random
const double = qKit.util.randomDouble(2, 50);

const color = qKit.util.randomColor();

console.log('Random Int:', int);
console.log('Random Double:', double);
console.log('Random Color:', color);

// example using random in positioning entities
```

## **Positioning**

```
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
```

## **Trigonometry**

```
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
```

## **Play a Sound**

```
qKit.init();

// pass the source of the sound file with the extension
qKit.sound.play('sound-test.mp3');
```

## **Grouping Entities**

```
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
```

## **Looping**

```
qKit.init();

const numLoops = 8;

qKit.repeat(i => {
  qKit.draw.quad({
    x: 5 + i * (40),
    y: 200,
    color: qKit.util.randomColor()
  })
}, numLoops);
```

## **Game Loop**

```
qKit.init();

const quad = qKit.draw.quad();

qKit.update(() => {
  console.log('Game is updating...');
  quad.x ++;
  quad.y ++;
  quad.angle ++;
})
```

## **Screen Width and Height**

```
qKit.init({
  width: 300,
  height: 200
});

console.log('Screen Width ~~>', qKit.screen.width);
console.log('Screen Height ~~>', qKit.screen.height);
```

## **Layering Entities**

```
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
```

## **Stop Rendering**

```
qKit.init();


const rect = qKit.draw.quad({
  width: 200,
  color: 'blue',
  y: 200,
});

// this will stop rendering the rectangle
rect.isRender = false;
```

## **Remove Entities**

```
qKit.init();


const quad = qKit.draw.quad();

// this will remove the quad
quad.remove();
```

## **Collision Detection**

```
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
```

## **Play/Pause**

```
qKit.init();

const quad = qKit.draw.quad();
quad.center();
quad.y = 20;

let count = 0;
let countToPause = 50;


qKit.update(() => {
  count ++;

  // will pause qKit when count == countToPause
  if (count === countToPause) {
    qKit.pause();
  }

  quad.y += 2;
});

qKit.input.click(() => {
  // qKit will resume after clicking anywhere
  qKit.play();
});
```

## **Using Extension**

```
qKit.init();

// by default qKit will not allow any new prop to be added to any
// quad, image, or sprite
// the solution to this is using extension

const quad = qKit.draw.quad({
  extension: {
    someString: 'some value',
    someNumber: 100,
    someObject: {
      key: 'a value'
    }
  }
});

// or
quad.extension.numArray = [1, 2, 3, 4];

console.log(quad.extension)
```
