export interface IOrder {
    completed: boolean;
    createdAt: number;
    key?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
}


export class Order implements IOrder {
    completed: boolean = false;
    createdAt: number = Firebase.ServerValue.TIMESTAMP;
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;

    constructor() {
    }
}
