import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { CompetitionsListComponent } from './competitions-list/competitions-list.component';
import {MatListModule} from "@angular/material/list";
import {HttpClientModule} from "@angular/common/http";
import { MatchesListComponent } from './match/matches-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    HomeComponent,
    CompetitionsListComponent,
    MatchesListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
