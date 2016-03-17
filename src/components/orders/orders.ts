import { Component } from 'angular2/core';
import { CanActivate } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { OrderStore } from 'core/order/order-store';
import { OrderList } from './order-list/order-list';

const template: string = require('./orders.html');


@Component({
  directives: [
    OrderList
  ],
  selector: 'orders',
  template
})

@CanActivate(() => AuthRouteHelper.requireAuth() !== null)

export class Orders {
  constructor(public orderStore: OrderStore) {}
}
