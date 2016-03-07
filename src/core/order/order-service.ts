import { IOrder } from './order';


export class OrderService {
  constructor(private ref: Firebase) {}

  createOrder(order: IOrder): void {
      console.log(order);
    this.ref.push(order, (error: Error) => {
      if (error) {
        console.error('ERROR @ createOrder :', error);
      }
    });
  }

  deleteOrder(order: IOrder): void {
    this.ref.child(order.key).remove((error: Error) => {
      if (error) {
        console.error('ERROR @ deleteOrder :', error);
      }
    });
  }

  updateOrder(order: IOrder, changes: any): void {
    this.ref.child(order.key).update(changes, (error: Error) => {
      if (error) {
        console.error('ERROR @ updateOrder :', error);
      }
    });
  }
}
