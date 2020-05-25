import { Component, OnInit, Input, AfterViewInit, AfterViewChecked, OnChanges } from '@angular/core';
import { ScoreService } from '../score.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {
  public scores: Observable<Object>;

  constructor(private scoreService: ScoreService) { 
    this.scoreService.changedScoreboard.subscribe(value => {
      this.scores = this.scoreService.getScoreList();
    })
  }
  

  ngOnInit(): void {
  }
}
