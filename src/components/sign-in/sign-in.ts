import { Component } from 'angular2/core';
import { CanActivate, Router } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { AuthService } from 'core/auth/auth-service';

const styles: string = require('./sign-in.scss');
const template: string = require('./sign-in.html');


@Component({
  selector: 'sign-in',
  styles: [styles],
  template
})

@CanActivate(() => AuthRouteHelper.requireUnauth())

export class SignIn {
  constructor(private auth: AuthService, private router: Router) {}

  signInWithFacebook(): void {
    this.auth.signInWithFacebook()
      .then(() => this.postSignIn());
  }

  signInWithGoogle(): void {
    this.auth.signInWithGoogle()
      .then(() => this.postSignIn());
  }

  signInAsGuest(): void {
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
    let user = this.auth.currentUser();
    console.log(user);
    // this.router.navigate(['/Order Form']);
  }
}
