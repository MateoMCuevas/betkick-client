import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CompetitionStandings, Standing, UserBetSummary} from "../model";
import {MatPaginator} from "@angular/material/paginator";
import {EventService} from "../service/event.service";
import {ActivatedRoute} from "@angular/router";

class TableData {
  group: string;
  standings: MatTableDataSource<Standing>;
}

@Component({
  selector: 'app-standings',
  templateUrl: './standings-table.component.html',
  styleUrls: ['./standings-table.component.css']
})
export class StandingsTableComponent implements OnInit {
  displayedColumns: string[] = ['club', 'won', 'draw', 'lost', 'goalsFor', 'goalsAgainst',
    'goalDifference', 'points'];
  dataSources: TableData[] = [];


  constructor(private eventService: EventService, private route: ActivatedRoute) {
  }

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        const competitionId = id !== 0 ? id : undefined;
        this.getStandings(competitionId);
      });
  }

  getStandings(competitionId: number | undefined) {
    if (competitionId === undefined)
      competitionId = 2021;

    this.dataSources = [];

    this.eventService.getStandings(competitionId)
      .subscribe(compStandings => {
        compStandings.forEach(compStanding => {
          let tableStandings = new MatTableDataSource<Standing>([]);
          tableStandings.data = compStanding.standings;
          let tableData: TableData = {
            group: compStanding.group,
            standings: tableStandings
          };
          this.dataSources.push(tableData);
        })
      });
  }
}
