qKit.init();

qKit.input.keyDown(keyCode => {
  console.log('KeyDown ~~>', keyCode);
});

qKit.input.keyUp(keyCode => {
  console.log('KeyUp ~~>', keyCode);
});
