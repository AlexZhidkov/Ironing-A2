import { IUser } from './user';


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
}
