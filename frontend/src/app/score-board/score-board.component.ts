import { Component, OnInit } from '@angular/core';
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
  }
  
  ngOnInit(): void {
    this.scores = this.scoreService.getScoreList(); 
  }

}
