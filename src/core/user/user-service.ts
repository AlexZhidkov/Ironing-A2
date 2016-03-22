import { IUser, User } from './user';
import { IOrder } from '../order/order';

export class UserService {
    constructor(private ref: Firebase) { }

    createUser(user: IUser, id: string): void {
        this.ref.child(id).set(user, (error: Error) => {
            if (error) {
                console.error('ERROR @ createUser :', error);
            }
        });
    }

    deleteUser(user: IUser): void {
        this.ref.child(user.key).remove((error: Error) => {
            if (error) {
                console.error('ERROR @ deleteUser :', error);
            }
        });
    }

    updateUser(userKey: string, changes: any): void {
        this.ref.child(userKey).update(changes, (error: Error) => {
            if (error) {
                console.error('ERROR @ updateUser :', error);
            }
        });
    }
    
    updateUserFromOrder(key: string, order: IOrder): void {
        let newClient = new User();
        newClient.name = order.name;
        newClient.email = order.email;
        newClient.phone = order.phone;
        newClient.address = order.address;
        // newClient.lastOrderAt = order.createdAt;
        this.updateUser(key, newClient);
    }

}
