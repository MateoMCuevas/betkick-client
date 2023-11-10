import { Component } from '@angular/core';


@Component({
  selector: 'app-card-match',
  templateUrl: './card-match.component.html',
  styleUrls: ['./card-match.component.css']
})
export class CardMatchComponent {
  chips: boolean = false;
  showChips(){
    this.chips=true
  }
}


