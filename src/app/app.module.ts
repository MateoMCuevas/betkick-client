import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TopMenuComponent} from './menu-components/top-menu/top-menu.component';
import {HomeComponent} from './home-components/home/home.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CompetitionsComponent} from './home-components/competitions/competitions.component';
import {MatListModule} from "@angular/material/list";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from '@angular/material/card';
import {CardBetComponent} from './betting-card-components/card-bet/card-bet.component';
import {MatChipsModule} from '@angular/material/chips';
import {CardMatchComponent} from './betting-card-components/card-match/card-match.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatchesComponent} from './home-components/matches/matches.component';
import {AppRoutingModule} from "./app-routing.module";
import {MatDividerModule} from '@angular/material/divider';
import {DepositComponent} from './user-components/deposit/deposit.component';
import {WithdrawComponent} from './user-components/withdraw/withdraw.component';
import {MyBetsComponent} from './user-components/my-bets/my-bets.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatchComponent} from './home-components/match/match.component';
import {LiveMatchComponent} from './home-components/live-match/live-match.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatInputModule} from "@angular/material/input";
import {FooterComponent} from './footer/footer.component';
import {TopMenuDropdownComponent} from './menu-components/top-menu-dropdown/top-menu-dropdown.component';
import {StandingsTableComponent} from './standings-components/standings-table/standings-table.component';
import {
  StandingsCompetitionsComponent
} from './standings-components/standings-competitions/standings-competitions.component';
import {StandingsComponent} from './standings-components/standings/standings.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {LandingPageComponent} from './landing-page/landing-page.component';
import {NotFoundComponent} from './404-not-found/not-found.component';
import {LoginFormComponent} from './login-register-components/login-form/login-form.component';
import {RegisterFormComponent} from './login-register-components/register-form/register-form.component';


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
    FooterComponent,
    TopMenuDropdownComponent,
    StandingsTableComponent,
    StandingsCompetitionsComponent,
    StandingsComponent,
    LandingPageComponent,
    NotFoundComponent,
    LoginFormComponent,
    RegisterFormComponent,
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
    MatInputModule,
    MatTooltipModule,
    MatSortModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
