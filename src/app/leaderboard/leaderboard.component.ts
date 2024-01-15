import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserBetSummary} from "../model";
import {MatPaginator} from "@angular/material/paginator";
import {EventService} from "../service/event.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'betsWon', 'betsLost', 'earnings'];
  dataSource = new MatTableDataSource<UserBetSummary>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private eventService: EventService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getLeaderboard();
  }

  getLeaderboard() {
    this.eventService.getLeaderboard()
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }
}
