var canvas_width = 600;
var canvas_height = 400;

var Player;
var Ball;
var Background;

var speed = 1;
var ball_x = Math.floor(Math.random() * (canvas_width-20)) + 5;

function startNewGame() {
  Player = new component(50,50,"bin.png",canvas_width/2-25,canvas_height-50);
  Ball = new component(20,20,"paper.png",ball_x,0,);
  Background = new component(canvas_width,canvas_height,"nature.jpg",0,0);
  GameArea.start();
}

var GameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = canvas_width;
    this.canvas.height = canvas_height; 
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    window.addEventListener('keydown', function(e){
      GameArea.keys = (GameArea.keys || []);
      GameArea.keys[e.keyCode] = true;
    });
    window.addEventListener('keyup',function(e){
      GameArea.keys[e.keyCode] = false;
    });
    this.interval = setInterval(updateGameArea,10);
    this.score = 0;
  },
  clear : function() {
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }
}


function component(width, height, color, x, y){
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.hide = false;
  /* position of the element */
  this.x = x;
  this.y = y; 
  /* drawing element on its current position */ 
  this.update = function(){
    ctx = GameArea.context;
    this.image = new Image();
    this.image.src = color;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  /* chaning position of the element according to speed  */
  this.newPos = function(){
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.hitBottom = function(){
    var bottom = GameArea.canvas.height - this.height;
    if(this.y < bottom){
      return false;
    }
    return true;
  }

  this.leftSide = function(){
    var left_side = 0;
    if(this.x > left_side){
      return false;
    }
    return true;
  } 

  this.rightSide = function(){
    var right_side = GameArea.canvas.width - this.width;
    if(this.x < right_side){
      return false;
    }
    return true;
  }

  this.crashWith = function(otherObj){
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherObj.x;
    var otherright = otherObj.x + (otherObj.width);
    var othertop = otherObj.y;
    var otherbottom = otherObj.y + (otherObj.height);

    if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright))
      return false;
    
    return true;
  }
}

function updateGameArea(){
  if(Ball.hitBottom()){
    GameArea.stop();
  } 

  if(Player.crashWith(Ball)){
    GameArea.score += 5;
    if(GameArea.score % 25 == 0){
      speed += 0.2;
    }

    ball_x = Math.floor(Math.random() * (canvas_width-20)) + 5;
    Ball.x = ball_x;
    Ball.y = 0;
  }

  GameArea.clear();

  if(GameArea.keys && GameArea.keys[37]){
    if(!Player.leftSide()){
      Player.x -= 2;
    }
  }
  if(GameArea.keys && GameArea.keys[39]){
   if(!Player.rightSide()){
      Player.x += 2;
    } 
  }

  Background.update();

  Ball.speedY = speed;
  Ball.newPos();
  Ball.update();

  Player.update();

  var ctx = GameArea.canvas.getContext("2d");
  ctx.font = "20px Arial";
  ctx.strokeText("Score: " + GameArea.score, canvas_width -100, 30);
}