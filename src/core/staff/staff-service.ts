import { IStaff } from './staff';


export class StaffService {
    constructor(private ref: Firebase) { }

    createStaff(staff: IStaff, id: string): void {
        this.ref.child(id).set(staff, (error: Error) => {
            if (error) {
                console.error('ERROR @ createStaff :', error);
            }
        });
    }

    deleteStaff(staff: IStaff): void {
        this.ref.child(staff.key).remove((error: Error) => {
            if (error) {
                console.error('ERROR @ deleteStaff :', error);
            }
        });
    }

    updateStaff(staff: IStaff, changes: any): void {
        this.ref.child(staff.key).update(changes, (error: Error) => {
            if (error) {
                console.error('ERROR @ updateStaff :', error);
            }
        });
    }
}
