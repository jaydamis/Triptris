var canvasWidth = 640;
var canvasHeight = 480;
var bkgrndColor = [0,0,0];
var gmBoard;

function setup() {
    gmBoard = new gameBoard();
    createCanvas(canvasWidth,canvasHeight);
    background(bkgrndColor);
    gmBoard.randomize();
}

function draw() {
    gmBoard.draw();
    gmBoard.randomize();
}
class gameBoard {
    constructor(){
        this.tiles = new Array(64);
        for(var i=0;i<this.tiles.length;i++){
            this.tiles[i] = new Array(48);
        }
    }
    draw() {
        for(var i=0;i<this.tiles.length;i++){
            for(var j=0;j<this.tiles[i].length;j++){
                fill(this.tiles[i][j].color);
                ellipse(i*10+5,j*10+5,10,10);
            }
        }
    }
    randomize() {
        for(var i=0;i<this.tiles.length;i++){
            for(var j=0;j<this.tiles[i].length;j++){
                this.tiles[i][j]=new square();
            }
        }
    }
}

class square {
    constructor(){
        this.color = [random()*255,random()*255,random()*255]
    }
    draw() {

    }
}


