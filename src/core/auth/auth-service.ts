import { EventEmitter } from 'angular2/core';
import { IUser, User } from './user';
import { StaffService } from 'core/staff/staff-service';

export class AuthService {
  private authData: FirebaseAuthData;
  private emitter: EventEmitter<any> = new EventEmitter();
  private user: IUser = new User();

  constructor(private ref: Firebase, private staffService: StaffService) {
    this.authData = this.ref.getAuth();

    this.ref.onAuth((authData: FirebaseAuthData) => {
      this.authData = authData;
      if (authData !== null) {
        this.user.role = this.staffService.getStaffRole(authData.uid);
        this.user.id = authData.uid;
        if (authData.provider === 'google') {
            /* tslint:disable:no-string-literal */
            this.user.name = authData['google']['displayName'];
            this.user.imageUrl = authData['google']['profileImageURL'];
            /* tsslint:enable:no-string-literal */
        }
      }
      console.log(this.user);
      this.emit();
    });
  }

  get authenticated(): boolean {
    return this.authData !== null && !this.expired;
  }

  get currentUser(): IUser {
    return this.authenticated ? this.user : null;
  }

  get expired(): boolean {
    return !this.authData || (this.authData.expires * 1000) < Date.now();
  }

  get id(): string {
    return this.authenticated ? this.authData.uid : '';
  }

  signInWithFacebook(): Promise<any> {
    return this.authWithOAuth('facebook');
  }

  signInWithGoogle(): Promise<any> {
    return this.authWithOAuth('google');
  }

  signInAsGuest(): Promise<any> {
    return this.authAnonymously();
  }

  signOut(): void {
    this.ref.unauth();
  }

  subscribe(next: (authenticated: boolean) => void): any {
    let subscription = this.emitter.subscribe(next);
    this.emit();
    return subscription;
  }

  private getRole(ref: string, cb: any): void {
    ref.once('value', function(snapshot: FirebaseDataSnapshot): void {
      let staff: IStaff = snapshot.val();
      cb(staff.role, this.user);
    });
  }

  private authWithOAuth(provider: string): Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.ref.authWithOAuthPopup(provider, (error: Error) => {
        if (error) {
          console.error('ERROR @ AuthService#authWithOAuth :', error);
          reject(error);
        }
        else {
          resolve();
        }
      });
    });
  }

  private authAnonymously(): Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.ref.authAnonymously((error: Error) => {
        if (error) {
          console.error('ERROR @ AuthService#authAnonymously :', error);
          reject(error);
        }
        else {
          resolve();
        }
      });
    });
  }

  private emit(): void {
    this.emitter.next(this.authenticated);
  }
}
