import {Component, OnInit} from '@angular/core';
import { cardToggle } from './card-animations';
import {BetService} from "../service/bet.service"
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-bet',
  templateUrl: './card-bet.component.html',
  styleUrls: ['./card-bet.component.css'],
  animations: [cardToggle]
})
export class CardBetComponent implements OnInit {
  cardDelete = false;
  isCardVisible = true;
  betList: any = null

  constructor(
    private betService: BetService
  ){}

  ngOnInit() {
    this.betService.listBets$.subscribe((datos) => {
      this.betList = datos;
    });
  }
  sendData() {
      if (this.betList !== null) {
        this.betService.sendDataToBackend().subscribe(
          (response) => {
            console.log("Backend's response: ", response);
          },
          (error) => {
            alert(error.error.apierror.message)
            console.error('An error occurred: ', error.error.apierror.message);
          }
        );
      }
  }

  toggleCardVisibility() {
    this.isCardVisible = !this.isCardVisible;
  }

  deleteAll() {
    this.betService.deleteList()
  }
}
