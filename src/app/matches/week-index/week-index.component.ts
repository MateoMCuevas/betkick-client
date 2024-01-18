import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-week-index',
  templateUrl: './week-index.component.html',
  styleUrls: ['./week-index.component.css']
})
export class WeekIndexComponent {
  @Input() weeks: number[];
  @Output() weekSelected = new EventEmitter<number>();

  selectedWeek: number | undefined;

  navigateToWeek(week: number) {
    this.selectedWeek = week;
    this.weekSelected.emit(week);
  }
}
