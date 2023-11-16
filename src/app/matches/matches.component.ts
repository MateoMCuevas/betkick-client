import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Match} from "../interfaces";
import {EventService} from "../event.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: Match[] = [];

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute) {
    //private location: Location) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const competitionId = id !== 0 ? id : undefined;
      this.getMatches(competitionId);
    });
  }

  getMatches(competitionId?: number): void {
    this.eventService.getMatches(competitionId)
      .subscribe(matches => {
        this.matches = matches;
      });
  }

  //goBack(): void {
   // this.location.back();
  //}

  protected readonly Math = Math;
  protected readonly parseFloat = parseFloat;
}
