import { Component } from 'angular2/core';
import { CanActivate } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { ClientStore } from 'core/client/client-store';
import { ClientList } from './client-list/client-list';

const template: string = require('./clients.html');


@Component({
  directives: [
    ClientList
  ],
  selector: 'clients',
  template
})

@CanActivate(() => AuthRouteHelper.requireAuth())

export class Clients {
  constructor(public clientStore: ClientStore) {}
}
