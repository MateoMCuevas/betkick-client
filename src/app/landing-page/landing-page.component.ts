import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(public auth: AuthService) {
  }
}
