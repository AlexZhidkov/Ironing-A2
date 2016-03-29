export interface IRoles {
    manager: string;
    driver: string;
    ironer: string;
}


export class Roles implements IRoles {
    manager: string = 'manager';
    driver: string = 'driver';
    ironer: string = 'ironer';

    constructor() {
    }
}

export class RefDataService {
    constructor() { }

    getStaffRoles(): IRoles {
        return new Roles();
    }
}
