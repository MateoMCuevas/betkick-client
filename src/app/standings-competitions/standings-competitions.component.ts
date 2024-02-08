import {Component, OnInit} from '@angular/core';
import {Competition} from "../model";
import {EventService} from "../service/event.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-standings-competitions',
  templateUrl: './standings-competitions.component.html',
  styleUrls: ['./standings-competitions.component.css']
})
export class StandingsCompetitionsComponent implements OnInit {
  competitions: Competition[] = [];
  competitionsToShow: Competition[] = [];

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getCompetitions();
  }

  onClick(event: MouseEvent) {
    // Access the clicked element
    const clickedElement = event.target as HTMLElement;

    // Check if the clicked element has the "active" class
    const hasActiveClass = clickedElement.classList.contains('active') || clickedElement.classList.contains('markerClass');

    /*if (hasActiveClass) {
      this.router.navigate(["/home"]);
    } */
  }

  getCompetitions(): void {
    this.eventService.getCompetitionsWithStandings()
      .subscribe(competitions => {
        this.competitions = competitions;
        this.competitionsToShow = this.competitions.reverse();
      });
  }
}
