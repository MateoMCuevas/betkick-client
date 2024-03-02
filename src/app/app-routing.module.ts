import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MatchesComponent} from "./matches/matches.component";
import {DepositComponent} from './deposit/deposit.component';
import {WithdrawComponent} from './withdraw/withdraw.component';
import {MyBetsComponent} from './my-bets/my-bets.component';
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";
import {StandingsTableComponent} from "./standings-table/standings-table.component";
import {StandingsComponent} from "./standings/standings.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LoginFormComponent} from "./login-form/login-form.component";

const routes: Routes = [
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginFormComponent},
  {
    path: 'standings',
    component: StandingsComponent,
    children: [
      {path: '', redirectTo: '2021', pathMatch: 'full'},
      {path: ':id', component: StandingsTableComponent}
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: '', component: MatchesComponent},
      {path: 'competitions/:id', component: MatchesComponent}
    ]
  },
  {path: 'deposit', component: DepositComponent},
  {path: 'withdraw', component: WithdrawComponent},
  {path: 'my-bets', component: MyBetsComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
