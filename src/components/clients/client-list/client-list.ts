import { ChangeDetectionStrategy, Component, Input } from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/subject/ReplaySubject';
import { ClientItem } from '../client-item/client-item';
import { ClientListFilterPipe } from './client-list-filter-pipe';

const template: string = require('./client-list.html');
const style: string = require('./client-list.scss');

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [
        RouterLink,
        ClientItem
    ],
    pipes: [
        ClientListFilterPipe
    ],
    selector: 'client-list',
    styles: [style],
    template
})

export class ClientList {
    @Input() clients: ReplaySubject<List<any>>;

    constructor(params: RouteParams) {
    }
}
