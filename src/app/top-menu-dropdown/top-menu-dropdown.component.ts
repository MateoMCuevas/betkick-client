import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MoneyUserService} from "../service/money-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-menu-dropdown',
  templateUrl: './top-menu-dropdown.component.html',
  styleUrls: ['./top-menu-dropdown.component.css']
})
export class TopMenuDropdownComponent {
}
