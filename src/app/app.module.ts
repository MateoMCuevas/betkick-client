import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {HomeComponent} from './home/home.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CompetitionsComponent} from './competitions/competitions.component';
import {MatListModule} from "@angular/material/list";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from '@angular/material/card';
import {CardBetComponent} from './card-bet/card-bet.component';
import {MatChipsModule} from '@angular/material/chips';
import {CardMatchComponent} from './card-match/card-match.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatchesComponent} from './matches/matches.component';
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    HomeComponent,
    CompetitionsComponent,
    CardBetComponent,
    CardMatchComponent,
    MatchesComponent,

  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
