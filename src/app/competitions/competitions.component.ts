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

  // HIGHLIGHT SELECTED COMPETITION
  //activeCompetition: number | null = null;
  /*setActive(index: number): void {
    this.activeCompetition = index === this.activeCompetition ? null : index;
  } */

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.getCompetitions();
  }

  getCompetitions(): void {
    this.eventService.getCompetitions()
      .subscribe(competitions => this.competitions = competitions);
  }


}
