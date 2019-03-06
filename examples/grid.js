qKit.init({
  border: {
    width: 10,
    color: '#111111',
  }
});

const numRows = 20;
const numCols = 20;
const cellSize = qKit.screen.width / numRows;

qKit.repeat(i => {
  qKit.repeat(j => {
    qKit.draw.quad({
      x: j * (cellSize),
      y: i * (cellSize),
      width: cellSize,
      height: cellSize,
      color: qKit.util.randomColor(),
      group: 'matrix',
      extension: {
        id: `${i}-${j}`,
      }
    });
  }, numCols);
}, numRows);

const matrix = qKit.groups('matrix');
let count = 0;

qKit.update(() => {
  qKit.repeat(i => {
    count ++;
    if (count > 50) {
      count = 0;
      matrix[i].color = qKit.util.randomColor();
    }
  }, matrix.length);
});