import { Component } from 'angular2/core';
import { CanActivate } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';

const template: string = require('./order-form.html');


@Component({
  selector: 'orderForm',
  template
})

@CanActivate(() => AuthRouteHelper.requireAuth())

export class OrderForm {
  constructor() {}
}
