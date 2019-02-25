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
