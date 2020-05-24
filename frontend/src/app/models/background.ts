export class Background {
  public width: number;
  public height: number;
  public image: HTMLImageElement;

  constructor(private ctx: CanvasRenderingContext2D) { 
    this.image = new Image(750,500);
    this.image.src = "assets/nature.jpg";
  }

  public draw(){
    this.ctx.drawImage(this.image,0,0, 750,500);
  }
}


