import {Constant} from '../models/constants';

export class Player {
  public x: number;
  public y: number;
  public image: HTMLImageElement;

  constructor(private ctx: CanvasRenderingContext2D) { 
    this.x = Constant.canvas_width/2 - Constant.player_width/2;
    this.y = Constant.canvas_height - Constant.player_height;  
    this.image = new Image(Constant.player_width,Constant.player_height);
    this.image.src = "assets/bin.png";
    }

  public draw(){
    this.ctx.drawImage(this.image,this.x,this.y,Constant.player_width,Constant.player_height);
  }
  
  public moveLeft(){
    if(this.x >= Constant.init_speed)
        this.x -= Constant.init_speed;
  } 

  public moveRight(){
    if(this.x <= Constant.canvas_width - Constant.player_width - Constant.init_speed){
        this.x += Constant.init_speed;
    }
  }

}

