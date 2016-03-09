import { Component } from 'angular2/core';
import { CanActivate } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { FormBuilder, ControlGroup, Validators } from 'angular2/common';
import { IOrder } from 'core/order/order';
import { OrderService } from 'core/order/order-service';

const styles: string = require('./order-form.scss');
const template: string = require('./order-form.html');

@Component({
    selector: 'orderForm',
    styles: [styles],
    template
})

@CanActivate(() => AuthRouteHelper.requireAuth())

export class OrderForm {
    model: IOrder;
    order: ControlGroup;
    builder: FormBuilder;
    constructor(private orderService: OrderService, fb: FormBuilder) {
        this.order = fb.group({
            'name': ['', Validators.required],
            'email': ['', Validators.required],
            'phone': ['', Validators.required],
            'address': ['', Validators.required],
            'message': ['', Validators.required]
        });
    }
    submit(event: any): void {
        this.model.name = this.order.name;
        this.orderService.createOrder(this.model);

        console.log(this.order.value);
        event.preventDefault();
    }
}
