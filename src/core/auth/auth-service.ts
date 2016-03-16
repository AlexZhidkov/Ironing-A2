import { EventEmitter } from 'angular2/core';
import { IUser, User } from './user';

export class AuthService {
  private authData: FirebaseAuthData;
  private emitter: EventEmitter<any> = new EventEmitter();  
  user: IUser = new User();


  constructor(private ref: Firebase) {
    this.authData = this.ref.getAuth();

    this.ref.onAuth((authData: FirebaseAuthData) => {
      this.authData = authData;
      if(authData !== null) {
           this.getRole(this.ref.child('staff').child(authData.uid), function(val) {
                console.log(val);
                this.user.role = val;
            });
          //this.ref.child('staff').child(authData.uid).once('value', function(dataSnapshot) {
              //this.test(dataSnapshot.val()['role'])
              //user.role = dataSnapshot.val()['role'];
        //this.user.role = dataSnapshot.val().role;
        //};

        this.user.id = authData.uid;
        if (authData.provider == 'google') {
            this.user.name = authData['google']['displayName'];
            this.user.imageUrl = authData['google']['profileImageURL'];
        }
      }
      console.log(this.user);
      this.emit();
    });
  }
  
  private getRole(ref, cb) {
    ref.once('value', function(dataSnapshot) {
      cb(dataSnapshot.val()['role']);
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
