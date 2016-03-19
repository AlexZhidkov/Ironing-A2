import { IStaff } from './../staff/staff';

export class ProfileService {

   constructor(private ref: Firebase, private authId: string) {}

   getStaff(): Promise<IStaff> {
    return new Promise((resolve: (staff: IStaff) => void, reject: (reason: Error) => void) => {
      this.ref.child(this.authId).once('value', (snapshot: FirebaseDataSnapshot) => {
        if (snapshot) {
            let newStaff: IStaff = snapshot.val();
           resolve(newStaff);
        }
        else {
          let error = new Error('ERROR @ getStaffRole: empty snapshot');
          console.error('ERROR @ getStaffRole  :', error);
          reject(error);
        }
      });
    });
  }

  saveStaff(changes: IStaff): void {
    this.ref.child(this.authId).update(changes, (error: Error) => {
        if (error) {
            console.error('ERROR @ updateOrder :', error);
        }
    });
  }
}
