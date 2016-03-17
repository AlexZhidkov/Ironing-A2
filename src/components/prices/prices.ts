import { Component } from 'angular2/core';
import { CanActivate } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { PriceStore } from 'core/price/price-store';
import { PriceList } from './price-list/price-list';

const template: string = require('./prices.html');


@Component({
  directives: [
    PriceList
  ],
  selector: 'prices',
  template
})

@CanActivate(() => AuthRouteHelper.requireAuth() !== null)

export class Prices {
  constructor(public priceStore: PriceStore) {}
}
