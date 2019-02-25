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
