import { IPrice } from './price';


export class PriceService {
    constructor(private ref: Firebase) { }

    createPrice(price: IPrice): void {
        this.ref.child(price.name).set(price.price, (error: Error) => {
            if (error) {
                console.error('ERROR @ createPrice :', error);
            }
        });
    }

    deletePrice(price: IPrice): void {
        this.ref.child(price.name).remove((error: Error) => {
            if (error) {
                console.error('ERROR @ deletePrice :', error);
            }
        });
    }

    updatePrice(name: string, price: number): void {
        this.ref.child(name).set(price, (error: Error) => {
            if (error) {
                console.error('ERROR @ updatePrice :', error);
            }
        });
    }
}
