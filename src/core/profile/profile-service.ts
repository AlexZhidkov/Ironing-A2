export class ProfileService {
    constructor(private ref: Firebase, private authId: string) { }

    getRef(): Firebase {
        return this.ref.child(this.authId);
    }
}
