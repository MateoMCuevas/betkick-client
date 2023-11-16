import {Component, OnInit} from '@angular/core';
import {Competition} from "../interfaces";
import {EventService} from "../event.service";

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  competitions: Competition[] = [];
  activeCompetition: number | null = null;

  setActive(index: number): void {
    this.activeCompetition = index === this.activeCompetition ? null : index;
  }

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
