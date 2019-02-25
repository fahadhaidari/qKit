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
