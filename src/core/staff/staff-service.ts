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

    updateStaff(staffKey: string, changes: any): void {
        this.ref.child(staffKey).update(changes, (error: Error) => {
            if (error) {
                console.error('ERROR @ updateStaff :', error);
            }
        });
    }
}
