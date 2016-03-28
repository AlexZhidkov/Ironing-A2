import { ChangeDetectionStrategy, Component, Input } from 'angular2/core';
//import { MDL } from 'directives/MaterialDesignLiteUpgradeElement';
import { MdlComponent } from 'directives/mdl-directive';
import { RouterLink, RouteParams } from 'angular2/router';
import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/subject/ReplaySubject';
import { OrderItem } from '../order-item/order-item';
import { OrderListFilterPipe } from './order-list-filter-pipe';

const styles: string = require('./order-list.scss');
const template: string = require('./order-list.html');


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [
        RouterLink,
        MdlComponent,
        OrderItem
    ],
    pipes: [
        OrderListFilterPipe
    ],
    selector: 'order-list',
    styles: [styles],
    template
})

export class OrderList {
    @Input() orders: ReplaySubject<List<any>>;

    filter: string;

    constructor(params: RouteParams) {
        this.filter = params.get('filter');
    }
}
