import { ChangeDetectionStrategy, Component, Input } from 'angular2/core';
import { RouterLink } from 'angular2/router';
import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/subject/ReplaySubject';
import { PriceItem } from '../price-item/price-item';

const styles: string = require('./price-list.scss');
const template: string = require('./price-list.html');


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [
    RouterLink,
    PriceItem
  ],
  selector: 'price-list',
  styles: [styles],
  template
})

export class PriceList {
  @Input() prices: ReplaySubject<List<any>>;

  constructor() {}

}
