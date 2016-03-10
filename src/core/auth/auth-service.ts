import { EventEmitter } from 'angular2/core';


export class AuthService {
  private authData: FirebaseAuthData;
  private emitter: EventEmitter<any> = new EventEmitter();

  constructor(private ref: Firebase) {
    this.authData = this.ref.getAuth();

    this.ref.onAuth((authData: FirebaseAuthData) => {
      this.authData = authData;
      this.emit();
    });
  }

  get authenticated(): boolean {
    return this.authData !== null && !this.expired;
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
