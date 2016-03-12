import { Component } from 'angular2/core';
import { RouteConfig, RouterOutlet, RouteDefinition } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { NavbarComponent } from '../dashboard/navbar';
import { AuthService } from 'core/auth/auth-service';
import { SignIn } from '../sign-in/sign-in';
import { OrderForm } from '../orders/order-form/order-form';
import { Orders } from '../orders/orders';
import { Clients } from '../clients/clients';
import { Staff } from '../staff/staff';

const styles: string = require('./app.scss');
const template: string = require('./app.html');

export var APP_ROUTES: RouteDefinition[] = [
    {path: '/', component: SignIn, as: 'SignIn'},
    {path: '/orderform', component: OrderForm, as: 'OrderForm'},
    {path: '/orders', component: Orders, as: 'Orders'},
    {path: '/clients', component: Clients, as: 'Clients'},
    {path: '/staff', component: Staff, as: 'Staff'}
];

@Component({
  directives: [
    RouterOutlet,
    NavbarComponent
  ],
  selector: 'app',
  styles: [styles],
  template
})

@RouteConfig(APP_ROUTES)

export class App {
  authenticated: boolean = false;
  public appRoutes: RouteDefinition[];

  constructor(private auth: AuthService, routeHelper: AuthRouteHelper) {
    auth.subscribe((authenticated: boolean) => {
      this.authenticated = authenticated;
      this.appRoutes = APP_ROUTES;
    });
  }

  signOut(): void {
    this.auth.signOut();
    window.location.replace('/');
  }
}
