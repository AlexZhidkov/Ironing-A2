import { provide } from 'angular2/core';
import { FIREBASE_ORDER_URL } from '../../config';
import { AuthService } from '../auth/auth-service';
import { OrderService } from './order-service';

export const TASK_PROVIDERS: any[] = [
  provide(OrderService, {
    deps: [AuthService],
    useFactory: (auth: AuthService): OrderService => {
      return new OrderService(new Firebase(`${FIREBASE_ORDER_URL}/${auth.id}`));
    }
  })
];
