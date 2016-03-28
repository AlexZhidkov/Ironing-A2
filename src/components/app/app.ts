import { Component, ElementRef } from 'angular2/core';
import { RouteConfig, RouterOutlet, RouteDefinition } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { AuthService } from 'core/auth/auth-service';
import { SignIn } from '../sign-in/sign-in';
import { OrderForm } from '../orders/order-form/order-form';
import { Orders } from '../orders/orders';
import { Clients } from '../clients/clients';
import { Staff } from '../staff/staff';
import { Prices } from '../prices/prices';
import { Profile } from '../profile/profile';
import { IUser } from 'core/user/user';

const styles: string = require('./app.scss');
const template: string = require('./app.html');

export var APP_ROUTES: RouteDefinition[] = [
    { path: '/', component: SignIn, as: 'Sign In' },
    { path: '/orderform', component: OrderForm, as: 'Order Form' },
    { path: '/orders', component: Orders, as: 'Orders' },
    { path: '/clients', component: Clients, as: 'Clients' },
    { path: '/staff', component: Staff, as: 'Staff' },
    { path: '/prices', component: Prices, as: 'Prices' },
    { path: '/profile', component: Profile, as: 'Profile' }
];

declare var componentHandler: any;

@Component({
    directives: [
        RouterOutlet
    ],
    selector: 'app',
    styles: [styles],
    template
})

@RouteConfig(APP_ROUTES)

export class App {
    authenticated: IUser = null;
    public appRoutes: RouteDefinition[];
    elementRef: ElementRef;

    constructor(private auth: AuthService, routeHelper: AuthRouteHelper, elementRef: ElementRef) {
        this.elementRef = elementRef;
        auth.subscribe((authenticated: IUser) => {
            this.authenticated = authenticated;
            this.appRoutes = APP_ROUTES;
        });
    }

    signOut(): void {
        this.authenticated = null;
        this.auth.signOut();
        window.location.replace('/');
    }
}
