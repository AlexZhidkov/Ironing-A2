import { Component } from 'angular2/core';
import { CanActivate } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import {FormBuilder, ControlGroup, Validators} from 'angular2/common';

const styles: string = require('./order-form.scss');
const template: string = require('./order-form.html');


@Component({
    selector: 'orderForm',
    styles: [styles],
    template
})

@CanActivate(() => AuthRouteHelper.requireAuth())

export class OrderForm {
    order: ControlGroup;
    builder: FormBuilder;
    constructor(fb: FormBuilder) {
        this.order = fb.group({
            'name': ['', Validators.required],
            'email': ['', Validators.required],
            'phone': ['', Validators.required],
            'address': ['', Validators.required],
            'message': ['', Validators.required]
        });
    }
    submit(event: any): void {
        console.log(this.order.value);
        event.preventDefault();
    }
}
