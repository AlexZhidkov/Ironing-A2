import { Component } from 'angular2/core';
import { CanActivate } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { FormBuilder, ControlGroup, Validators } from 'angular2/common';
import { ToasterContainerComponent, ToasterService } from 'angular2-toaster/angular2-toaster';
import { Order } from 'core/order/order';
import { OrderService } from 'core/order/order-service';
import { UserService } from 'core/user/user-service';
import { AuthService } from 'core/auth/auth-service';

const styles: string = require('./order-form.scss');
const template: string = require('./order-form.html');

@Component({
    selector: 'orderForm',
    directives: [ToasterContainerComponent],
    providers: [ToasterService],
    styles: [styles],
    template
})

@CanActivate(() => AuthRouteHelper.requireAuth() !== null)

export class OrderForm {
    order: ControlGroup;
    builder: FormBuilder;

    constructor(private orderService: OrderService,
                private userService: UserService,
                private authService: AuthService,
                private toasterService: ToasterService,
                fb: FormBuilder) {
        let currentUser = this.authService.authenticated;
        this.order = fb.group({
            'name': [currentUser.name, Validators.required],
            'email': [currentUser.email, Validators.required],
            'phone': [currentUser.phone, Validators.required],
            'address': [currentUser.address, Validators.required],
            'message': ['', Validators.required]
        });
    }

    submit(event: any): void {
        let data = new Order();
        data.name = this.order.value.name;
        data.email = this.order.value.email;
        data.phone = this.order.value.phone;
        data.address = this.order.value.address;
        data.message = this.order.value.message;

        this.orderService.createOrder(data);
        this.userService.updateUserFromOrder(this.authService.authenticated.key, data);

        event.preventDefault();
        this.toasterService.pop('success', 'Saved', 'Your order is submitted');
    }
}
