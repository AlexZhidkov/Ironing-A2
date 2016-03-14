export interface IPrice {
    key: string;
    value: number;
}

export class Price implements IPrice {
    key: string;
    value: number;

    constructor() {
    }
}
