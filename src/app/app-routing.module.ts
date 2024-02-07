import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MatchesComponent} from "./matches/matches.component";
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { MyBetsComponent } from './my-bets/my-bets.component';
import { AuthGuard } from './auth-guard.guard';
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'leaderboard', component: LeaderboardComponent },
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
