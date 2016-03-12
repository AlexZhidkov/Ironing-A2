import { IClient, Client } from './client';
import { IOrder } from '../order/order';

export class ClientService {
    constructor(private ref: Firebase, private authId: string) { }

    createClient(client: IClient): void {
        this.ref.child(this.authId).set(client, (error: Error) => {
            if (error) {
                console.error('ERROR @ createClient :', error);
            }
        });
    }

    deleteClient(client: IClient): void {
        this.ref.child(this.authId).remove((error: Error) => {
            if (error) {
                console.error('ERROR @ deleteClient :', error);
            }
        });
    }

    updateClient(changes: any): void {
        this.ref.child(this.authId).update(changes, (error: Error) => {
            if (error) {
                console.error('ERROR @ updateClient :', error);
            }
        });
    }

    createOrUpdateClient(order: IOrder): void {
        let newClient = new Client();
        newClient.name = order.name;
        newClient.email = order.email;
        newClient.phone = order.phone;
        newClient.address = order.address;
        newClient.lastOrderAt = order.createdAt;
        let savedClient = this.ref.child(this.authId).once('value', s => s.val());
        if (savedClient) {
            this.updateClient(newClient);
        }
        else {
            this.createClient(newClient);
        }
    }
}
