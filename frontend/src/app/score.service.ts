import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scoreUrl = "http://localhost:3000/";

  private changed = new BehaviorSubject<boolean>(false);
  public changedScoreboard = this.changed.asObservable();

  constructor(private http: HttpClient) { }
   

  public getScoreList(): Observable<Object>{
    return this.http.get(this.scoreUrl);
  }

  public changedScoreList(){
    this.changed.next(!this.changed.value);
  }

  public insertInScoreList(score: number, name: string): void{
    this.http.post(this.scoreUrl,{score: score.toString(), name: name}).subscribe(() => {});
  }

}
