import { IClient, Client } from './client';
import { IOrder } from '../order/order';

export class ClientService {
    constructor(private ref: Firebase, private userKey: string) { }

    createClient(client: IClient): void {
        this.ref.child(this.userKey).set(client, (error: Error) => {
            if (error) {
                console.error('ERROR @ createClient :', error);
            }
        });
    }

    deleteClient(client: IClient): void {
        this.ref.child(this.userKey).remove((error: Error) => {
            if (error) {
                console.error('ERROR @ deleteClient :', error);
            }
        });
    }

    updateClient(key: string, changes: any): void {
        this.ref.child(key).update(changes, (error: Error) => {
            if (error) {
                console.error('ERROR @ updateClient :', error);
            }
        });
    }

    updateClientFromOrder(key: string, order: IOrder): void {
        let newClient = new Client();
        newClient.name = order.name;
        newClient.email = order.email;
        newClient.phone = order.phone;
        newClient.address = order.address;
        // newClient.lastOrderAt = order.createdAt;
        this.updateClient(key, newClient);
    }
}
