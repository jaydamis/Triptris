var canvasWidth = 640;
var canvasHeight = 480;
var bkgrndColor = [0,0,0];
var gmBoard;
var piecey
var frame = 1;

function setup() {
    gmBoard = new gameBoard();
    createCanvas(canvasWidth,canvasHeight);
    background(bkgrndColor);
    gmBoard.randomize();
    piecey = new piece();
}

function draw() {
    keyCheck();
    background(bkgrndColor);
    gmBoard.draw();
    //gmBoard.randomize();
    piecey.draw();
    if(frame%10==0){
        piecey.update();
        if(piecey.status == "REST"){
            gmBoard.pieces.push(piecey);
            piecey = new piece();
        }
    }
    frame++;
    if(frame>30){
        frame=1;
    }
}
function keyCheck(){
    if(keyIsDown(LEFT_ARROW)){
        piecey.x--;
    }
    else if(keyIsDown(RIGHT_ARROW)){
        piecey.x++;
    }
}
class gameBoard {
    constructor(){
        this.tiles = new Array(32);
        this.pieces = new Array();
        for(var i=0;i<this.tiles.length;i++){
            this.tiles[i] = new Array(24);
        }
    }
    draw() {
        // for(var i=0;i<this.tiles.length;i++){
        //     for(var j=0;j<this.tiles[i].length;j++){
        //         fill(this.tiles[i][j].color);
        //         ellipse(i*20+10,j*20+10,20,20);
        //     }
        // }
        for(var i=0;i<this.pieces.length;i++){
            this.pieces[i].draw();
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

class piece {
    constructor() {
        this.status = "PRIMARY";
        var x=10;
        var y=0;
        this.color=[random()*255,random()*255,random()*255]
        this.squares = new Array();
        var typeID = Math.floor(random(6));
        if(typeID==0){
            this.type = "square";
            this.squares.push(new square(x,y,this.color));
            this.squares.push(new square(x+1,y,this.color));
            this.squares.push(new square(x,y+1,this.color));
            this.squares.push(new square(x+1,y+1,this.color));
        }
        else if(typeID==1){
            this.type = "elBlock";
            this.squares.push(new square(x,y,this.color));
            this.squares.push(new square(x+1,y,this.color));
            this.squares.push(new square(x+1,y+1,this.color));
            this.squares.push(new square(x+1,y+2,this.color));
        }
        else if(typeID==2){
            this.type = "reverseElBlock";
            this.squares.push(new square(x+1,y,this.color));
            this.squares.push(new square(x+1,y+1,this.color));
            this.squares.push(new square(x+1,y+2,this.color));
            this.squares.push(new square(x,y+2,this.color));
        }
        else if(typeID==3){
            this.type = "squiggly";
            this.squares.push(new square(x,y,this.color));
            this.squares.push(new square(x,y+1,this.color));
            this.squares.push(new square(x+1,y+1,this.color));
            this.squares.push(new square(x+1,y+2,this.color));
        }
        else if(typeID==4){
            this.type = "reverseSquiggly";
            this.squares.push(new square(x+1,y,this.color));
            this.squares.push(new square(x+1,y+1,this.color));
            this.squares.push(new square(x,y+1,this.color));
            this.squares.push(new square(x,y+2,this.color));
        }
        else{
            this.type = "line";
            for(var i=0;i<4;i++){
                this.squares.push(new square(x,y+i,this.color));                
            }
        }

    }
    draw(){
        for(var i=0;i<this.squares.length;i++){
            this.squares[i].draw();
        }
    }
    update(){
        if(this.checkCollision("DOWN")!=true){
            for(var i=0;i<this.squares.length;i++){
                this.squares[i].drop();
            }
        }
    }
    checkCollision(direction){
        if(direction=="DOWN"){
            //Hit the floor?
            for(var i=0;i<this.squares.length;i++){
                if(this.squares[i].y==23){
                    this.status = "REST"
                    return true;
                }
            }
            //Hit another piece?
            for(var i=0;i<this.squares.length;i++){
                for(var j=0;j<gmBoard.pieces.length;j++){
                    for(var k=0;k<gmBoard.pieces[j].squares.length;k++){
                        if(this.squares[i].x == gmBoard.pieces[j].squares[k].x &&
                            this.squares[i].y+1 == gmBoard.pieces[j].squares[k].y){
                                this.status = "REST";
                                return true;
                            }
                    }
                }
            }
        }
        return false;
    }
}

class square {
    constructor(x,y,color){
        this.color = color;
        this.x = x;
        this.y = y;
    }
    draw() {
        fill(this.color);
        rect(this.x*20,this.y*20,20,20);
    }
    drop(){
        this.y++;
    }
}


