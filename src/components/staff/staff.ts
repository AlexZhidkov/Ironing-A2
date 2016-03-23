import { Component } from 'angular2/core';
import { CanActivate } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { UserStore } from 'core/user/user-store';
import { StaffList } from './staff-list/staff-list';

const template: string = require('./staff.html');


@Component({
    directives: [
        StaffList
    ],
    selector: 'staff',
    template
})

@CanActivate(() => AuthRouteHelper.requireAuth() !== null)

export class Staff {
    constructor(public userStore: UserStore) { }
}
