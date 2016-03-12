import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouterLink, RouteDefinition} from 'angular2/router';

const template: string = require('./navbar.html');

@Component({
    selector: 'navbar',
    template,
    directives: [RouterLink, CORE_DIRECTIVES]
})
export class NavbarComponent {
    @Input() brand: string;
    @Input() routes: RouteDefinition[];
}
