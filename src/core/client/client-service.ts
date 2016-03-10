import { IClient, Client } from './client';
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
        this.ref.child(this.authId).remove((error: Error) => {
            if (error) {
                console.error('ERROR @ deleteClient :', error);
            }
        });
    }

    updateClient(client: IClient, changes: any): void {
        this.ref.child(this.authId).update(changes, (error: Error) => {
            if (error) {
                console.error('ERROR @ updateClient :', error);
            }
        });
    }

    createOrUpdateClient(order: IOrder): void {
        let client = new Client();
        client.name = order.name;
        client.email = order.email;
        client.phone = order.phone;
        client.address = order.address;
        client.lastOrderAt = order.createdAt;
        console.log('this.ref.child(this.authId) : ', this.ref.child(this.authId));
        if (this.ref.child(this.authId) !== null) {
            // this.updateClient(client)
        }
        else {
            this.createClient(client);
        }
    }
}
