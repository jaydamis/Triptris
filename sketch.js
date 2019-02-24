var canvasWidth = 640;
var canvasHeight = 480;
var gameWidth = 10;
var bkgrndColor = [0,0,0];
var gmBoard;
var piecey;
var frame = 1;

function setup() {
    createCanvas(canvasWidth,canvasHeight);
    background(bkgrndColor);
    gmBoard = new gameBoard();
    gmBoard.randomize();
    piecey = new piece();
}

function draw() {
    background(bkgrndColor);
    gmBoard.checkLineCompletion();
    gmBoard.draw();
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

function keyPressed(){
    if(keyCode == LEFT_ARROW){
        piecey.moveLeft();
    }
    if(keyCode == RIGHT_ARROW){
        piecey.moveRight();
    }
    if(keyCode == DOWN_ARROW){
        piecey.slamDown();
    }
    if(keyCode == UP_ARROW){
        piecey.rotate();
    }
}
class gameBoard {
    constructor(){
        this.pieces = new Array();
        this.tiles = new Array(32);
        for(var i=0;i<this.tiles.length;i++){
            this.tiles[i] = new Array(24);
        }
        this.minx = (32-gameWidth)/2;
    }
    draw() {
        for(var i=0;i<this.pieces.length;i++){
            this.pieces[i].draw();
        }
        fill(80,40,200);
        rect(0,0,this.minx*20,canvasHeight);
        rect((this.minx+gameWidth)*20,0,this.minx*20,canvasHeight);
    }
    //Check each line to see if it is as wide as the game board.
    checkLineCompletion(){
        //Put each non moving game piece an an array of x and y values.
        var filled = new Array()
        for(var i=0;i<this.pieces.length;i++){
            for(var sq=0;sq<this.pieces[i].squares.length;sq++){
                filled.push([this.pieces[i].squares[sq].x,this.pieces[i].squares[sq].y]);
            }
        }
        //loop through each y value and see if there are enough x values to fill the width
        for(var i=0;i<24;i++){
            var line = filled.filter(element => element[1]==i)
            if(line.length>=gameWidth){
                this.clearLine(i);
            }
        }        
    }
    clearLine(line){
        for(var i=0;i<this.pieces.length;i++){
            for(var j=0;j<this.pieces[i].squares.length;j++){
                if(this.pieces[i].squares[j].y==line){
                    this.pieces[i].squares.splice(j,1);
                    j--;
                }
            }
        }
        for(var i=0;i<this.pieces.length;i++){
            for(var j=0;j<this.pieces[i].squares.length;j++){
                if(this.pieces[i].squares[j].y<line){
                    this.pieces[i].squares[j].y++;
                }
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

class piece {
    constructor() {
        this.status = "PRIMARY";
        this.rotation = 0;
        this.rotationTransform = 
            [[[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0]]];
        var x=gameWidth/2;
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
            this.rotationTransform = [
                [[0,2],[-1,1],[0,0],[1,-1]],
                [[2,0],[1,1],[0,0],[-1,-1]],
                [[0,-2],[1,-1],[0,0],[-1,1]],
                [[-2,0],[-1,-1],[0,0],[1,1]]
            ];
        }
        else if(typeID==2){
            this.type = "reverseElBlock";
            this.squares.push(new square(x+1,y,this.color));
            this.squares.push(new square(x+1,y+1,this.color));
            this.squares.push(new square(x+1,y+2,this.color));
            this.squares.push(new square(x,y+2,this.color));
            this.rotationTransform = [
                [[-1,1],[0,0],[1,-1],[2,0]],
                [[1,1],[0,0],[-1,-1],[0,-2]],
                [[1,-1],[0,0],[-1,1],[-2,0]],
                [[-1,-1],[0,0],[1,1],[0,2]]
            ];
        }
        else if(typeID==3){
            this.type = "squiggly";
            this.squares.push(new square(x,y,this.color));
            this.squares.push(new square(x,y+1,this.color));
            this.squares.push(new square(x+1,y+1,this.color));
            this.squares.push(new square(x+1,y+2,this.color));
            this.rotationTransform = [
                [[-1,1],[0,0],[-1,-1],[0,-2]],
                [[1,1],[0,0],[-1,1],[-2,0]],
                [[1,-1],[0,0],[1,1],[0,2]],
                [[-1,-1],[0,0],[1,-1],[2,0]]
            ];
        }
        else if(typeID==4){
            this.type = "reverseSquiggly";
            this.squares.push(new square(x+1,y,this.color));
            this.squares.push(new square(x+1,y+1,this.color));
            this.squares.push(new square(x,y+1,this.color));
            this.squares.push(new square(x,y+2,this.color));
            this.rotationTransform = [
                [[-1,1],[0,0],[1,1],[2,0]],
                [[1,1],[0,0],[1,-1],[0,-2]],
                [[1,-1],[0,0],[-1,-1],[-2,0]],
                [[-1,-1],[0,0],[-1,1],[0,2]]
            ];
        }
        else{
            this.type = "line";
            for(var i=0;i<4;i++){
                this.squares.push(new square(x,y+i,this.color));                
            }
            this.rotationTransform = [
                [[-1,1],[0,0],[1,-1],[2,-2]],
                [[1,-1],[0,0],[-1,1],[-2,2]],
                [[-1,1],[0,0],[1,-1],[2,-2]],
                [[1,-1],[0,0],[-1,1],[-2,2]]
            ];
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
    moveLeft(){
        if(this.checkCollision("LEFT")!=true){
            for(var i=0;i<this.squares.length;i++){
                this.squares[i].moveLeft();
            }
        }
    }
    moveRight(){
        if(this.checkCollision("RIGHT")!=true){
            for(var i=0;i<this.squares.length;i++){
                this.squares[i].moveRight();
            }
        }       
    }
    slamDown(){
        while(this.checkCollision("DOWN")!=true){
            for(var i=0;i<this.squares.length;i++){
                this.squares[i].drop();
            }            
        }
    }
    rotate(){
        for(var i=0; i<this.squares.length;i++){
            this.squares[i].x += this.rotationTransform[this.rotation][i][0];
            this.squares[i].y += this.rotationTransform[this.rotation][i][1];
        }
        this.rotation++;
        if(this.rotation>3){
            this.rotation = 0;
        }
        if(this.checkCollision("NONE")){
            this.rotate();
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
        if(direction=="LEFT"){
            for(var i=0;i<this.squares.length;i++){
                if(this.squares[i].x-1<0){
                    return true;
                }
            }
            for(var i=0;i<this.squares.length;i++){
                for(var j=0;j<gmBoard.pieces.length;j++){
                    for(var k=0;k<gmBoard.pieces[j].squares.length;k++){
                        if(this.squares[i].x-1 == gmBoard.pieces[j].squares[k].x &&
                            this.squares[i].y == gmBoard.pieces[j].squares[k].y){
                                return true;
                            }
                    }
                }
            }
        }
        if(direction=="RIGHT"){
            for(var i=0;i<this.squares.length;i++){
                if(this.squares[i].x+1>gameWidth-1){
                    return true;
                }
            }
            for(var i=0;i<this.squares.length;i++){
                for(var j=0;j<gmBoard.pieces.length;j++){
                    for(var k=0;k<gmBoard.pieces[j].squares.length;k++){
                        if(this.squares[i].x+1 == gmBoard.pieces[j].squares[k].x &&
                            this.squares[i].y == gmBoard.pieces[j].squares[k].y){
                                return true;
                            }
                    }
                }
            }
        }
        if(direction=="NONE"){
            for(var i=0; i<this.squares.length;i++){
                if(this.squares[i].x < 0 || this.squares[i].x > gameWidth-1 || 
                    this.squares[i].y < 0 || this.squares[i].y > 23){
                    return true;
                }
                for(var j=0;j<gmBoard.pieces.length;j++){
                    for(var k=0;k<gmBoard.pieces[j].squares.length;k++){
                        if(this.squares[i].x == gmBoard.pieces[j].squares[k].x &&
                            this.squares[i].y == gmBoard.pieces[j].squares[k].y){
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
        rect((gmBoard.minx+this.x)*20,(this.y)*20,20,20);
    }
    drop(){
        this.y++;
    }
    moveLeft() {
        this.x--;
    }
    moveRight(){
        this.x++;
    }
}


