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
        let savedClient = new Client();
        let client = new Client();
        client.name = order.name;
        client.email = order.email;
        client.phone = order.phone;
        client.address = order.address;
        client.lastOrderAt = order.createdAt;
        this.ref.child(this.authId).once('value', function (dataSnapshot) {
                savedClient = getSavedClient(dataSnapshot)
            }, function (err) {
              // code to handle read error
        });

        if (savedClient.name) {
            // this.updateClient(client)
        }
        else {
            this.createClient(client);
        }
    }

    private getSavedClient(snapshot: FirebaseDataSnapshot): IClient {
        return snapshot.val()
    }

}
