import { Injectable } from 'angular2/core';
import { Router } from 'angular2/router';
import { AuthService } from './auth-service';
import { IUser } from './user';

/**
 * This is an ugly workaround until `CanActivate` supports DI
 * @see https://github.com/angular/angular/issues/4112
 */

@Injectable()
export class AuthRouteHelper {
  static auth: AuthService;
  static router: Router;

  static requireAuth(): IUser {
    const { auth, router } = AuthRouteHelper;
    if (!auth.authenticated) router.navigate(['/Sign In']);
    return auth.authenticated;
  }

  static requireUnauth(): boolean {
    const { auth, router } = AuthRouteHelper;
    if (auth.authenticated) router.navigate(['/Order Form']);
    return (auth.authenticated === null);
  }

  constructor(auth: AuthService, router: Router) {
    AuthRouteHelper.auth = auth;
    AuthRouteHelper.router = router;
  }
}
