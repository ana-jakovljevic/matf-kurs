import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameAreaComponent } from './game-area/game-area.component';
import { ScoreBoardComponent } from './score-board/score-board.component';


@NgModule({
  declarations: [
    AppComponent,
    GameAreaComponent,
    ScoreBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: 'Window',  useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
