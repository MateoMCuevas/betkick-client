import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserBetSummary} from "../model";
import {MatPaginator} from "@angular/material/paginator";
import {EventService} from "../service/event.service";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'betsWon', 'betsLost', 'earnings'];
  dataSource = new MatTableDataSource<UserBetSummary>([]);
  sortedDataSource = new MatTableDataSource<UserBetSummary>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private eventService: EventService) {
  }

  ngAfterViewInit() {
    this.sortedDataSource.paginator = this.paginator;
    this.getLeaderboard();
  }

  getLeaderboard() {
    this.eventService.getLeaderboard()
      .subscribe(data => {
        this.dataSource.data = data;
        this.sortedDataSource.data = data;
      });
  }

  sortData(sort: Sort) {

    this.sortedDataSource.data = this.dataSource.data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      if (!sort.active || sort.direction === '') {
        // default order is by position
        return this.compare(a.position, b.position, true, a, b);
      }

      switch (sort.active) {
        case 'betsWon':
          return this.compare(a.betsWon, b.betsWon, isAsc, a, b);
        case 'betsLost':
          return this.compare(a.betsLost, b.betsLost, isAsc, a, b);
        case 'earnings':
          return this.compare(a.earnings, b.earnings, isAsc, a, b);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean, standingA: UserBetSummary, standingB: UserBetSummary) {
    if (a === b) {
      return (standingA.position < standingB.position ? -1 : 1) * (!isAsc ? 1 : -1);
    }

    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
