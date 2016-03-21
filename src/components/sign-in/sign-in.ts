import { Component } from 'angular2/core';
import { CanActivate, Router } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { AuthService } from 'core/auth/auth-service';
import { StaffService } from 'core/staff/staff-service';
import { Staff } from 'core/staff/staff';

const styles: string = require('./sign-in.scss');
const template: string = require('./sign-in.html');


@Component({
  selector: 'sign-in',
  styles: [styles],
  template
})

@CanActivate(() => AuthRouteHelper.requireUnauth())

export class SignIn {
  private isStaff: boolean;

  constructor(private auth: AuthService, private staffService: StaffService, private router: Router) {
      this.isStaff = (router.root.lastNavigationAttempt === '/staff');
  }

  signInWithFacebook(): void {
    this.auth.signInWithFacebook()
      .then(() => this.postSignIn());
  }

  signInWithGoogle(): void {
    this.auth.signInWithGoogle()
      .then(() => this.postSignIn());
  }

  signInWithTwitter(): void {
    this.auth.signInWithTwitter()
      .then(() => this.postSignIn());
  }

  signInAsGuest(): void {
    this.isStaff = false;
    this.auth.signInAsGuest()
      .then(() => this.postSignIn());
  }

  callPhone(): void {
      window.location.href = 'tel:+61406522097';
  }

  sendSms(): void {
      window.location.href = 'sms:+61406522097';
  }

  private postSignIn(): void {
      if (this.isStaff) {
          let user = this.auth.authenticated;
          if (!user.role && user.role !== '') {
              let staff = new Staff();
              staff.name = user.name;
              staff.imageUrl = user.imageUrl;
              staff.role = 'new staff';
              this.staffService.createStaff(staff, user.id);
          }
      }
  }
}
