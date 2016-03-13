import { provide } from 'angular2/core';
import { FIREBASE_STAFF_URL } from '../../config';
import { AuthService } from '../auth/auth-service';
import { ProfileService } from './profile-service';

export const PROFILE_PROVIDERS: any[] = [
  provide(ProfileService, {
    deps: [AuthService],
    useFactory: (auth: AuthService): ProfileService => {
      return new ProfileService(new Firebase(`${FIREBASE_STAFF_URL}`), auth.id);
    }
  })
];
