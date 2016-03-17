import { Component } from 'angular2/core';
import { CanActivate } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { FormBuilder, ControlGroup, Validators } from 'angular2/common';
import { Order } from 'core/order/order';
import { OrderService } from 'core/order/order-service';
import { ClientService } from 'core/client/client-service';

const styles: string = require('./order-form.scss');
const template: string = require('./order-form.html');

@Component({
    selector: 'orderForm',
    styles: [styles],
    template
})

@CanActivate(() => AuthRouteHelper.requireAuth() !== null)

export class OrderForm {
    order: ControlGroup;
    builder: FormBuilder;
    constructor(private orderService: OrderService, private clientService: ClientService, fb: FormBuilder) {
        this.order = fb.group({
            'name': ['', Validators.required],
            'email': ['', Validators.required],
            'phone': ['', Validators.required],
            'address': ['', Validators.required],
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
        this.clientService.createOrUpdateClient(data);

        console.log(this.order.value);
        event.preventDefault();
    }
}
