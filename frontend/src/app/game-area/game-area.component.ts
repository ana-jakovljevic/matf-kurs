import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { Player } from '../models/player';
import { Trash } from '../models/trash';
import { Background } from '../models/background';
import { Constant } from '../models/constants';
import { ScoreService } from '../score.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.css']
})

export class GameAreaComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) 
  public canvas: ElementRef<HTMLCanvasElement>;
  public ctx: CanvasRenderingContext2D;
  public gameIsOn: boolean;
  public score: number;
  public firstPlay: boolean;
  public name: string;

  public player: Player;
  public trash: Trash;
  public background: Background;
  
  constructor(@Inject('Window') window: Window, private scoreService: ScoreService){
    this.gameIsOn = false;
    this.firstPlay = true;
    this.score = 0;
  } 

  ngAfterViewInit(): void{
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngOnInit(): void {
  }  

  public play() {
    this.gameIsOn = true;
    this.firstPlay = false;
    this.score = 0;

    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx);
    this.trash = new Trash(this.ctx);

    window.addEventListener('keydown', (key) => {
      switch(key.keyCode){
        case 37:
          this.player.moveLeft();
          break;
        case 39:
          this.player.moveRight();
          break;
      }
    });

    let interval = setInterval(() => {
      if(this.trash.collision(this.player.x, this.player.y)){
        this.score += Constant.score_increase;
      }

      if(this.trash.hitBottom()){
        this.scoreService.insertInScoreList(this.score, this.name);
        this.gameIsOn = false;
        this.scoreService.changedScoreList();

        this.ctx.clearRect(0,0,Constant.canvas_width,Constant.canvas_height);
        clearInterval(interval);
      }

      this.ctx.clearRect(0,0,Constant.canvas_width,Constant.canvas_height);
      this.background.draw();
      this.player.draw();
      this.trash.draw();
    }, 10);
  }
}
