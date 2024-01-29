import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
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
import {MatDividerModule} from '@angular/material/divider';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { MyBetsComponent } from './my-bets/my-bets.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatchComponent } from './matches/match/match.component';
import { LiveMatchComponent } from './matches/live-match/live-match.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { WeekIndexComponent } from './matches/week-index/week-index.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatInputModule} from "@angular/material/input";
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    HomeComponent,
    CompetitionsComponent,
    CardBetComponent,
    CardMatchComponent,
    MatchesComponent,
    DepositComponent,
    WithdrawComponent,
    MyBetsComponent,
    MatchComponent,
    LiveMatchComponent,
    LeaderboardComponent,
    WeekIndexComponent,
    FooterComponent,
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatDividerModule,
    MatTabsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
