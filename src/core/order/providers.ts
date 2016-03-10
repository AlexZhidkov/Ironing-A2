import { provide } from 'angular2/core';
import { FIREBASE_ORDERS_URL } from '../../config';
import { AuthService } from '../auth/auth-service';
import { OrderService } from './order-service';
import { OrderStore } from './order-store';

export const ORDER_PROVIDERS: any[] = [
  provide(OrderService, {
    deps: [AuthService],
    useFactory: (auth: AuthService): OrderService => {
      return new OrderService(new Firebase(`${FIREBASE_ORDERS_URL}`), auth.id);
    }
  }),

   provide(OrderStore, {
    deps: [AuthService],
    useFactory: (auth: AuthService): OrderStore => {
      return new OrderStore(new Firebase(`${FIREBASE_ORDERS_URL}`));
    }
  })
];
