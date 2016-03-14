import { IPrice } from './price';


export class PriceService {
    constructor(private ref: Firebase) { }

    createPrice(price: IPrice): void {
        this.ref.push(price, (error: Error) => {
            if (error) {
                console.error('ERROR @ createPrice :', error);
            }
        });
    }

    deletePrice(price: IPrice): void {
        this.ref.child(price.key).remove((error: Error) => {
            if (error) {
                console.error('ERROR @ deletePrice :', error);
            }
        });
    }

    updatePrice(price: IPrice, changes: any): void {
        this.ref.child(price.key).update(changes, (error: Error) => {
            if (error) {
                console.error('ERROR @ updatePrice :', error);
            }
        });
    }
}
