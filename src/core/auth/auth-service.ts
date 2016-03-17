import { EventEmitter } from 'angular2/core';
import { IUser, User } from './user';

export class AuthService {
  private authData: FirebaseAuthData;
  private emitter: EventEmitter<any> = new EventEmitter();
  private user: IUser = new User();

  constructor(private ref: Firebase) {
    this.authData = this.ref.getAuth();

    this.ref.onAuth((authData: FirebaseAuthData) => {
      this.authData = authData;
      if (authData !== null) {
        this.user.id = authData.uid;
        if (authData.provider === 'google') {
            this.user.name = authData['google']['displayName'];
            this.user.imageUrl = authData['google']['profileImageURL'];
        }
      }
      this.emit();
    });
  }

  get authenticated(): IUser {
    return (this.authData !== null && !this.expired) ? this.currentUser() : null;
  }

  currentUser(): IUser {
    this.getStaffRole().then((role) => this.user.role = role; )
    return this.user;
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

  subscribe(next: (authenticated: IUser) => void): any {
    let subscription = this.emitter.subscribe(next);
    this.emit();
    return subscription;
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

  private getStaffRole(): Promise<string> {
    return new Promise((resolve: (role: string) => void, reject: (reason: Error) => void) => {
      this.ref.child('staff').child(this.authData.uid).once('value', (snapshot: FirebaseDataSnapshot) => {
        if (snapshot) {
           resolve(snapshot.val()['role']);
        }
        else {
          let error = new Error('ERROR @ getStaffRole: empty snapshot');
          console.error('ERROR @ getStaffRole  :', error);
          reject(error);
        }
      });
    });

  }

  private emit(): void {
    this.emitter.next(this.authenticated);
  }
}
