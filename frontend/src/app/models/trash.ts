import { Player } from './player';
import { Constant } from './constants';

export class Trash {
  public x: number;
  public y: number;
  public image: HTMLImageElement;
  private counter;

  private speedY: number;
  private hidden: boolean;

  constructor(private ctx: CanvasRenderingContext2D) { 
    this.x = Math.floor(Math.random() * (Constant.canvas_width - Constant.trash_width) + Constant.trash_width);
    this.y = 0;   
    this.counter = 0;       
    this.speedY = Constant.init_speed/5;
    this.hidden = false;
    this.image = new Image(Constant.trash_width,Constant.trash_height);
    this.image.src = "assets/paper.png";
    this.image.id = "trash";  
  }

  public draw(){
    this.y += this.speedY;
    if(!this.hidden){
        this.ctx.drawImage(this.image,this.x,this.y,Constant.trash_width,Constant.trash_height);
    }
   }
  
  private changeSpeed(): void{
    this.speedY += Constant.speed_changer;
  }

  public hitBottom(): boolean{
    if(this.y < Constant.canvas_height-Constant.trash_height)
        return false;
    return true;
  }

  public collision(x: number, y:number): boolean{
    if(this.x <= x + Constant.player_width && this.x >= x - Constant.trash_width && this.y >= Constant.canvas_height - Constant.trash_height -Constant.player_height && this.y < Constant.canvas_height - Constant.player_height/2){
        this.counter += 1;
        this.x = Math.floor(Math.random() * (Constant.canvas_width - Constant.trash_width/2) + Constant.trash_width/2);
        this.y = 0;
        if(this.counter % 5 == 0){
            this.changeSpeed();
        }
        return true;
    }
    return false;
  }
}

