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
    if(piecey.y > 24){
        piecey = new piece();
    }
    background(bkgrndColor);
    //gmBoard.draw();
    gmBoard.randomize();
    piecey.draw();
    if(frame%10==0){
        piecey.update();
    }
    frame++;
    if(frame>30){
        frame=1;
    }
}
class gameBoard {
    constructor(){
        this.tiles = new Array(32);
        for(var i=0;i<this.tiles.length;i++){
            this.tiles[i] = new Array(24);
        }
    }
    draw() {
        for(var i=0;i<this.tiles.length;i++){
            for(var j=0;j<this.tiles[i].length;j++){
                fill(this.tiles[i][j].color);
                ellipse(i*20+10,j*20+10,20,20);
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
        var typeID = Math.floor(random(6));
        if(typeID==0)
            this.type = "square";
        else if(typeID==1){
            this.type = "elBlock";
        }
        else if(typeID==2){
            this.type = "reverseElBlock";
        }
        else if(typeID==3){
            this.type = "squiggly";
        }
        else if(typeID==4){
            this.type = "reverseSquiggly";
        }
        else
            this.type = "line";
        this.color=[random()*255,random()*255,random()*255]
        this.x=16;
        this.y=1;
    }
    draw(){
        fill(this.color);
        if(this.type=="square"){
            rect(this.x*20,this.y*20,20,20);
            rect(this.x*20+20,this.y*20,20,20);
            rect(this.x*20,this.y*20+20,20,20);
            rect(this.x*20+20,this.y*20+20,20,20)
        }
        if(this.type=="line"){
            for(var i=0;i<4;i++){
                rect(this.x*20,(this.y+i)*20,20,20);
            }
        }
        if(this.type=="elBlock"){
            rect(this.x*20,this.y*20,20,20);
            rect((this.x+1)*20,this.y*20,20,20);
            rect((this.x+1)*20,(this.y+1)*20,20,20);
            rect((this.x+1)*20,(this.y+2)*20,20,20);        
        }
        if(this.type=="reverseElBlock"){
            rect(this.x*20,this.y*20,20,20);
            rect((this.x)*20,(this.y+1)*20,20,20);
            rect((this.x)*20,(this.y+2)*20,20,20);
            rect((this.x-1)*20,(this.y+2)*20,20,20);
        }
        if(this.type=="squiggly"){
            rect((this.x)*20,(this.y)*20,20,20);
            rect((this.x)*20,(this.y+1)*20,20,20);
            rect((this.x+1)*20,(this.y+1)*20,20,20);
            rect((this.x+1)*20,(this.y+2)*20,20,20);            
        }
        if(this.type=="reverseSquiggly"){
            rect((this.x)*20,(this.y)*20,20,20);
            rect((this.x)*20,(this.y+1)*20,20,20); 
            rect((this.x-1)*20,(this.y+1)*20,20,20); 
            rect((this.x-1)*20,(this.y+2)*20,20,20);          
        }
    }
    update(){
        this.y++;
    }
}

class square {
    constructor(){
        this.color = [random()*255,random()*255,random()*255]
    }
    draw() {

    }
}


