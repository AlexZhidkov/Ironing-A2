import { EventEmitter } from 'angular2/core';
import { IUser, User } from './../user/user';

export class AuthService {
  private authData: FirebaseAuthData;
  private emitter: EventEmitter<any> = new EventEmitter();
  private user: IUser = new User();
  private isStaff: boolean = false;

  constructor(private ref: Firebase) {
    this.authData = this.ref.getAuth();

    this.ref.onAuth((authData: FirebaseAuthData) => {
      this.authData = authData;
      if (authData !== null) {
        this.user.key = authData.uid;
        if (authData.provider !== 'anonymous"') {
            this.user.name = authData[authData.provider]['displayName'];
            this.user.imageUrl = authData[authData.provider]['profileImageURL'];
            if (authData.provider === 'twitter') {            
                this.user.twitter = authData['twitter']['username'];
            }
        }
        this.getSavedUser().then((savedUser) => {
            this.user = savedUser;
            this.emit();
        });
      }
    });
  }

  get authenticated(): IUser {
    return (this.authData !== null && !this.expired) ? this.user : null;
  }

  setStaff(isStaff: boolean): void {
    this.isStaff = isStaff;
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

  signInWithTwitter(): Promise<any> {
    return this.authWithOAuth('twitter');
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

  private getSavedUser(): Promise<IUser> {
    return new Promise((resolve: (savedUser: IUser) => void, reject: (reason: Error) => void) => {
      this.ref.child('users').child(this.authData.uid).once('value', (snapshot: FirebaseDataSnapshot) => {
        if (snapshot.val()) {
           let savedUser: IUser = snapshot.val();
           resolve(savedUser);
        }
        else {
           this.user.role = 'client';
           this.ref.child('users').child(this.authData.uid).set(this.user, (error: Error) => {
                if (error) {
                    let errorMessage = 'ERROR @ createUser :' + error;
                    console.error(errorMessage);
                    reject(new Error(errorMessage));
                }
                else {
                    resolve(this.user);                     
                }
            });
        }
      });
    });
  }

  private emit(): void {
    this.emitter.next(this.authenticated);
  }
}
