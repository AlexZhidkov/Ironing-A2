export interface IStaff {
    key?: string;
    name: string;
    email: string;
    phone: number;
    imageUrl: string;
    role: string;
}


export class Staff implements IStaff {
    name: string;
    email: string;
    phone: number;
    imageUrl: string;
    role: string;

    constructor() {
    }
}
