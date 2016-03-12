import { ChangeDetectionStrategy, Component, Input } from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/subject/ReplaySubject';
import { ClientItem } from '../client-item/client-item';

const template: string = require('./client-list.html');

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [
    RouterLink,
    ClientItem
  ],
  selector: 'client-list',
  template
})

export class ClientList {
  @Input() clients: ReplaySubject<List<any>>;

  constructor(params: RouteParams) {
  }
}
