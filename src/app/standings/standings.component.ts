import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CompetitionStandings, Standing, UserBetSummary} from "../model";
import {MatPaginator} from "@angular/material/paginator";
import {EventService} from "../service/event.service";

class TableData {
  group: string;
  standings: MatTableDataSource<Standing>;
}

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements AfterViewInit {
  displayedColumns: string[] = ['club', 'won', 'draw', 'lost', 'goalsFor', 'goalsAgainst',
    'goalDifference', 'points'];
  dataSources: TableData[] = [];


  constructor(private eventService: EventService) {
  }

  ngAfterViewInit() {
    this.getStandings();
  }

  getStandings() {
    this.eventService.getStandings(2001)
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
