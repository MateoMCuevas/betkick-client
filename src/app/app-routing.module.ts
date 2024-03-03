import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home-components/home/home.component';
import {MatchesComponent} from "./home-components/matches/matches.component";
import {DepositComponent} from './user-components/deposit/deposit.component';
import {WithdrawComponent} from './user-components/withdraw/withdraw.component';
import {MyBetsComponent} from './user-components/my-bets/my-bets.component';
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";
import {StandingsTableComponent} from "./standings-components/standings-table/standings-table.component";
import {StandingsComponent} from "./standings-components/standings/standings.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {NotFoundComponent} from "./404-not-found/not-found.component";
import {LoginFormComponent} from "./login-register-components/login-form/login-form.component";
import {RegisterFormComponent} from "./login-register-components/register-form/register-form.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'register', component: RegisterFormComponent},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: '', component: MatchesComponent},
      {path: 'competitions/:id', component: MatchesComponent}
    ]
  },
  {
    path: 'standings',
    component: StandingsComponent,
    children: [
      {path: '', redirectTo: '2021', pathMatch: 'full'},
      {path: ':id', component: StandingsTableComponent}
    ]
  },
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: 'deposit', component: DepositComponent, canActivate: [AuthGuard]},
  {path: 'withdraw', component: WithdrawComponent, canActivate: [AuthGuard]},
  {path: 'my-bets', component: MyBetsComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
