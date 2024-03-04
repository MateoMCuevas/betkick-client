import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Competition} from "../../model";
import {EventService} from "../../services/event.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  competitions: Competition[] = [];
  competitionsToShow: Competition[] = [];

  constructor(private eventService: EventService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCompetitions();
  }

  onClick(event: MouseEvent) {
    // Access the clicked element
    const clickedElement = event.target as HTMLElement;

    // Check if the clicked element has the "active" class
    const hasActiveClass = clickedElement.classList.contains('active') || clickedElement.classList.contains('markerClass');

    if (hasActiveClass) {
      this.router.navigate(["/home"]);
    }
  }

  getCompetitions(): void {
    this.eventService.getActiveCompetitions()
      .subscribe(competitions => {
        this.competitions = competitions.data;
        this.competitionsToShow = this.competitions.reverse();
      });
  }


}
