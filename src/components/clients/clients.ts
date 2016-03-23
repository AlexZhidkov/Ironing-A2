import { Component } from 'angular2/core';
import { CanActivate } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { UserStore } from 'core/user/user-store';
import { ClientList } from './client-list/client-list';

const template: string = require('./clients.html');


@Component({
    directives: [
        ClientList
    ],
    selector: 'clients',
    template
})

@CanActivate(() => AuthRouteHelper.requireAuth() !== null)

export class Clients {
    constructor(public userStore: UserStore) { }
}
