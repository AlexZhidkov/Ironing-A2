import { provide } from 'angular2/core';
import { FIREBASE_STAFF_URL } from '../../config';
import { AuthService } from '../auth/auth-service';
import { StaffService } from './staff-service';
import { StaffStore } from './staff-store';

export const STAFF_PROVIDERS: any[] = [
  provide(StaffService, {
    deps: [AuthService],
    useFactory: (auth: AuthService): StaffService => {
      return new StaffService(new Firebase(`${FIREBASE_STAFF_URL}`), auth.id);
    }
  }),

   provide(StaffStore, {
    deps: [AuthService],
    useFactory: (auth: AuthService): StaffStore => {
      return new StaffStore(new Firebase(`${FIREBASE_STAFF_URL}`));
    }
  })
];
