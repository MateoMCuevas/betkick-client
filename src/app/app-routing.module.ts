import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MatchesComponent} from "./matches/matches.component";
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: '', component: MatchesComponent},
      {path: 'home/competitions/:id', component: MatchesComponent}
    ]
  },
  {path: 'deposit', component: DepositComponent},
  {path: 'withdraw', component: WithdrawComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
