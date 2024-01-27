import {Component, OnInit} from '@angular/core';
import {Competition} from "../model";
import {EventService} from "../service/event.service";

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  competitions: Competition[] = [];
  competitionsToShow: Competition[] = [];

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.getCompetitions();
  }
 filterCompetitions():void{
    this.competitionsToShow = this.competitions.filter(competition => competition.id !== 2000 && competition.id !==2018 && competition.id !==2152);
 }
 getCompetitions(): void {
  this.eventService.getCompetitions()
    .subscribe(competitions => {
      this.competitions = competitions;
      this.filterCompetitions();
    });
}


}
