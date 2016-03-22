export interface IUser {
    key?: string;
    name: string;
    phone: string;
    email: string;
    twitter: string;
    address: string;
    imageUrl: string;
    role: string;
}


export class User implements IUser {
    name: string;
    phone: string;
    email: string;
    twitter: string;
    address: string;
    imageUrl: string;
    role: string;
    
    constructor() {
    }
}
