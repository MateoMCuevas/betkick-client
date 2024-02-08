import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CompetitionStandings, Standing, UserBetSummary} from "../model";
import {MatPaginator} from "@angular/material/paginator";
import {EventService} from "../service/event.service";
import {ActivatedRoute} from "@angular/router";
import {Sort} from "@angular/material/sort";

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
  sortedDataSources: TableData[] = [];



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
    this.sortedDataSources = [];

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
          this.sortedDataSources.push(tableData);
        })
      });
  }

  sortData(sort: Sort, tableData: TableData, index: number) {
    const standings = tableData.standings
    console.log(index)

    this.sortedDataSources[index].standings.data = standings.data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      if (!sort.active || sort.direction === '') {
        // default order is by points
        return this.compare(a.points, b.points, false, a, b);
      }

      switch (sort.active) {
        case 'won':
          return this.compare(a.won, b.won, isAsc, a, b);
        case 'draw':
          return this.compare(a.draw, b.draw, isAsc, a, b);
        case 'lost':
          return this.compare(a.lost, b.lost, isAsc, a, b);
        case 'points':
          return this.compare(a.points, b.points, isAsc, a, b);
        case 'goalsFor':
          return this.compare(a.goalsFor, b.goalsFor, isAsc, a, b);
        case 'goalsAgainst':
          return this.compare(a.goalsAgainst, b.goalsAgainst, isAsc, a, b);
        case 'goalDifference':
          return this.compare(a.goalDifference, b.goalDifference, isAsc, a, b);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean, standingA: Standing, standingB: Standing) {
    if (a === b) {
      return (standingA.position < standingB.position ? -1 : 1) * (!isAsc ? 1 : -1);
    }

    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  protected readonly encodeURI = encodeURI;
}

