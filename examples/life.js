qKit.init({border:{width:8,color:'#824222'}});

const suffusion  =192;

const humor=new Array(2);
humor[0]=new Array(9);
humor[1]=new Array(9);

//was dead
humor[0][0]='#000000';
humor[0][1]='#001840';
humor[0][2]='#003050';
humor[0][3]='#40FF60';//born
humor[0][4]='#202840';
humor[0][5]='#20283C';
humor[0][6]='#1C2438';
humor[0][7]='#182030';
humor[0][8]='#101820';

//was alive
humor[1][0]='#602010';
humor[1][1]='#702018';
humor[1][2]='#D0FF00';//lives
humor[1][3]='#F8FF60';//lives
humor[1][4]='#803830';
humor[1][5]='#44342C';
humor[1][6]='#38302C';
humor[1][7]='#302820';
humor[1][8]='#281818';

const habitat=new Array(2);
habitat[0]=new Array(suffusion);
habitat[1]=new Array(suffusion);
qKit.repeat(r =>
{
  habitat[0][r]=new Array(suffusion);
  habitat[1][r]=new Array(suffusion);
}, suffusion);

var phase=0;
var auto=true;
var scroll=true;

const random5050Habitat = function()
{
  phase=0;

  qKit.repeat(r =>
  {
    qKit.repeat(c =>
    {
      habitat[0][r][c]=(qKit.util.randomInt(0, 2)*2)-1;
      habitat[1][r][c]=(qKit.util.randomInt(0, 2)*2)-1;
    }, suffusion);
  }, suffusion);
}

const populateOneWalker = function()
{
  const m=Math.floor(suffusion/2);//middle

  qKit.repeat(r =>
  {
    qKit.repeat(c =>
    {
      habitat[0][r][c]=habitat[1][r][c]=-1;
    }, suffusion);
  }, suffusion);

  //establish prior phase history
  habitat[0][m-1][m-1]=3;
  habitat[0][m-1][m  ]=3;
  habitat[0][m-1][m+1]=3;
  habitat[0][m  ][m+1]=3;
  habitat[0][m+1][m  ]=3;

  //evolve to display-stage
  phase=0;
  ComputeNextPhase();
  phase=1;
}

const computeNextPhase = function()
{
  qKit.repeat(r =>
  {
    qKit.repeat(c =>
    {
      //compute accumulator as positive=alive, negative=dead; magntitude = count of living neighbors
      let n=0;
      for(let j=-1;j<=1;j++)
        for(let i=-1;i<=1;i++)
          if((i!=0)||(j!=0))
            n+=(Math.sign(habitat[phase%2][(suffusion+r+j)%suffusion][(suffusion+c+i)%suffusion])+1)>>1;

      //3 living neighbors yield life in next phase, if alive and 2 neighbors then remains alive
      //positive=alive, negatve=dead; neighbor-count recorded as magnitude for color-coding ("humor")
      habitat[(phase+1)%2][r][c]=(n==3 || (n==2 && Math.sign(habitat[phase%2][r][c])==1))?n+1:-(n+1);
    }, suffusion);
  }, suffusion);
}

const cellSize = qKit.screen.width / suffusion;

qKit.repeat(r =>
{
  qKit.repeat(c =>
  {
    qKit.draw.quad
    ({
      x:c*(  cellSize),y:r*(  cellSize),
      width:  cellSize,height:cellSize,

      color:  '#000000',

      group: 'matrix'
    });
  }, suffusion);
}, suffusion);

const matrix = qKit.groups('matrix');

const renderCurrentPhase = function()
{
  qKit.repeat(i =>
  {
    //offset diagonally for each phase if scrolling is on
    const x=((i%suffusion)+suffusion+(scroll?phase:0))%suffusion;
    const y=(Math.floor(i/suffusion)+suffusion+(scroll?phase:0))%suffusion;

    //color-code by living/dead and prior neighbor-count
    matrix[i].color=humor[(Math.sign(habitat[(phase+1)%2][y][x])+1)>>1][Math.abs(habitat[phase%2][y][x])-1];
  }, matrix.length);
}

random5050Habitat();
renderCurrentPhase();

qKit.update(() => 
{
  if(auto)
  {
    computeNextPhase();

    phase=(phase+1)%suffusion;

    renderCurrentPhase();
  }
});
