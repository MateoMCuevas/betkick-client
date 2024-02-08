import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MatchesComponent} from "./matches/matches.component";
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { MyBetsComponent } from './my-bets/my-bets.component';
import { AuthGuard } from './auth-guard.guard';
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";
import {StandingsTableComponent} from "./standings-table/standings-table.component";
import {StandingsComponent} from "./standings/standings.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'leaderboard', component: LeaderboardComponent },
  {
    path: 'standings',
    component: StandingsComponent,
    children: [
      {path: '', redirectTo: '2021', pathMatch: 'full' },
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
  {path: 'deposit', component: DepositComponent,canActivate:[AuthGuard]},
  {path: 'withdraw', component: WithdrawComponent,canActivate:[AuthGuard]},
  {path: 'my-bets', component: MyBetsComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
