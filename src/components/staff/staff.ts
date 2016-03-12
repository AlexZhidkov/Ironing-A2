import { Component } from 'angular2/core';
import { CanActivate } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { StaffStore } from 'core/staff/staff-store';
import { StaffList } from './staff-list/staff-list';

const template: string = require('./staff.html');


@Component({
  directives: [
    StaffList
  ],
  selector: 'staff',
  template
})

@CanActivate(() => AuthRouteHelper.requireAuth())

export class Staff {
  constructor(public staffStore: StaffStore) {}
}
