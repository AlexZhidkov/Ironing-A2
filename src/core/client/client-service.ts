import { IClient } from './client';
import { IOrder } from '../order/order';

export class ClientService {
    constructor(private ref: Firebase, private authId: string) { }

    createClient(client: IClient): void {
        console.log(client);
        this.ref.push(client, (error: Error) => {
            if (error) {
                console.error('ERROR @ createClient :', error);
            }
        });
    }

    deleteClient(client: IClient): void {
        this.ref.child(client.key).remove((error: Error) => {
            if (error) {
                console.error('ERROR @ deleteClient :', error);
            }
        });
    }

    updateClient(client: IClient, changes: any): void {
        this.ref.child(client.key).update(changes, (error: Error) => {
            if (error) {
                console.error('ERROR @ updateClient :', error);
            }
        });
    }

    createOrUpdateClient(order: IOrder): void {
                console.log('createOrUpdateClient :', order);
    }
}
