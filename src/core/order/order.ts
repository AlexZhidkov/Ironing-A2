export interface IOrder {
    completed: boolean;
    createdAt: number;
    key?: string;
    clientId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
    assignedTo: string;
    pickedUpBy: string;
    ironedBy: string;
    deliveredBy: string;
    status: string;
    isPrepaid: boolean;
    garment: number;
    linen: number;
    totalCost: number;
}


export class Order implements IOrder {
    completed: boolean = false;
    createdAt: number = Firebase.ServerValue.TIMESTAMP;
    clientId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
    assignedTo: string;
    pickedUpBy: string;
    ironedBy: string;
    deliveredBy: string;
    status: string;
    isPrepaid: boolean;
    garment: number;
    linen: number;
    totalCost: number;

    constructor() {
    }
}
