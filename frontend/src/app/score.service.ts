import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scoreUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) { }
   
  public getScoreList(): Observable<Object>{
    return this.http.get(this.scoreUrl);
  }

  public insertInScoreList(score: number): void{
    this.http.post(this.scoreUrl,{score: score.toString()}).subscribe(() => {
    });
  }

}
