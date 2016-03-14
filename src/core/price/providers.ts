import { provide } from 'angular2/core';
import { FIREBASE_PRICES_URL } from '../../config';
import { AuthService } from '../auth/auth-service';
import { PriceService } from './price-service';
import { PriceStore } from './price-store';

export const PRICE_PROVIDERS: any[] = [
  provide(PriceService, {
    deps: [AuthService],
    useFactory: (auth: AuthService): PriceService => {
      return new PriceService(new Firebase(`${FIREBASE_PRICES_URL}`));
    }
  }),

   provide(PriceStore, {
    deps: [AuthService],
    useFactory: (auth: AuthService): PriceStore => {
      return new PriceStore(new Firebase(`${FIREBASE_PRICES_URL}`));
    }
  })
];
