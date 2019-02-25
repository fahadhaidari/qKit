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
