export interface IUser {
    id: string;
    name: string;
    role: string;
    imageUrl: string;
}


export class User implements IUser {
    id: string;
    name: string;
    role: string;
    imageUrl: string;

    constructor() {
    }
}
