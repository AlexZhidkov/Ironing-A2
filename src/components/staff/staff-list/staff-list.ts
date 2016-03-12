import { ChangeDetectionStrategy, Component, Input } from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/subject/ReplaySubject';
import { StaffItem } from '../staff-item/staff-item';
import { StaffListFilterPipe } from './staff-list-filter-pipe';

const styles: string = require('./staff-list.scss');
const template: string = require('./staff-list.html');


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [
    RouterLink,
    StaffItem
  ],
  pipes: [
    StaffListFilterPipe
  ],
  selector: 'staff-list',
  styles: [styles],
  template
})

export class StaffList {
  @Input() staff: ReplaySubject<List<any>>;

  filter: string;

  constructor(params: RouteParams) {
    this.filter = params.get('filter');
  }
}
