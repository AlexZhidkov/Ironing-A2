export interface IOrder {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}


export class Order implements IOrder {
  // createdAt: number = Firebase.ServerValue.TIMESTAMP;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;

  constructor() {
  }
}
