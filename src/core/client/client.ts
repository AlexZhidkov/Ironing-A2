export interface IClient {
    key?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    lastOrderAt: number;
}


export class Client implements IClient {
    name: string;
    email: string;
    phone: string;
    address: string;
    lastOrderAt: number;

    constructor() {
    }
}
