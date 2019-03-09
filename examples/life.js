qKit.init({border:{width:8,color:'#824222'}});

const suffusion	=192;

var humor=new Array(2);
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

var habitat=new Array(2);
habitat[0]=new Array(suffusion);
habitat[1]=new Array(suffusion);
for(var r=0;r<suffusion;r++)
{
	habitat[0][r]=new Array(suffusion);
	habitat[1][r]=new Array(suffusion);
}

var phase=0;
var auto=true;
var scroll=true;

function Random5050Habitat()
{
	phase=0;

	for(var r=0;r<suffusion;r++)for(var c=0;c<suffusion;c++)
	{
		habitat[0][r][c]=(Math.floor(Math.random()*2)<<2)-1;
		habitat[1][r][c]=(Math.floor(Math.random()*2)<<2)-1;
	}
}

function PopulateOneWalker()
{
	var m=Math.floor(suffusion/2);//middle

	for(var r=0;r<suffusion;r++)for(var c=0;c<suffusion;c++)habitat[0][r][c]=habitat[1][r][c]=-1;

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

function ComputeNextPhase()
{
	for(var r=0;r<suffusion;r++)for(var c=0;c<suffusion;c++)
	{
		//compute accumulator as positive=alive, negatve=dead; magntitude = count of living neighbors
		var n=0;for(var j=-1;j<=1;j++)for(var i=-1;i<=1;i++)if((i!=0)||(j!=0))
			n+=(Math.sign(habitat[phase%2][(suffusion+r+j)%suffusion][(suffusion+c+i)%suffusion])+1)>>1;

		//3 living neighbors yield life in next phase, if alive and 2 neighbors then remains alive
		//positive=alive, negatve=dead; neighbor-count recorded as magnitude for color-coding ("humor")
		habitat[(phase+1)%2][r][c]=(n==3 || (n==2 && Math.sign(habitat[phase%2][r][c])==1))?n+1:-(n+1);
	}
}

const cellSize	=qKit.screen.width/suffusion;
for(var r=0;r<suffusion;r++)for(var c=0;c<suffusion;c++)qKit.draw.quad
({
	x:c*(	cellSize),y:r*(	cellSize),
	width:	cellSize,height:cellSize,

	color:	0,

	group: 'matrix',
	extension:{id:`${r}-${c}`,}
});

const matrix=qKit.groups('matrix');

function RenderCurrentPhase()
{
	for(var i=0;i<matrix.length;i++)
	{
		//offset diagonally for each phase if scrolling is on
		var x=((i%suffusion)+suffusion+(scroll?phase:0))%suffusion;
		var y=(Math.floor(i/suffusion)+suffusion+(scroll?phase:0))%suffusion;

		//color-code by living/dead and prior neighbor-count
		matrix[i].color=humor[(Math.sign(habitat[(phase+1)%2][y][x])+1)>>1][Math.abs(habitat[phase%2][y][x])-1];
	}
}

Random5050Habitat();
//PopulateOneWalker();
RenderCurrentPhase();

qKit.update(() => {if(auto){ComputeNextPhase();phase=(phase+1)%suffusion;RenderCurrentPhase();}});
