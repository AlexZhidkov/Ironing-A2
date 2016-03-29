import { Component, Input } from 'angular2/core';
import { IUser } from 'core/user/user';
import { UserService } from 'core/user/user-service';
import { Autofocus } from 'directives/autofocus-directive';
import { MdMenu } from 'directives/md-menu';
import { RefDataService, IRoles } from 'core/refdata/refdata-service';

const styles: string = require('./staff-item.scss');
const template: string = require('./staff-item.html');
declare var componentHandler;

@Component({
    directives: [
        Autofocus,
        MdMenu
    ],
    selector: 'staff-item',
    styles: [styles],
    template
})

export class StaffItem {
    @Input() model: IUser;
    public roles: IRoles;

    constructor(private userService: UserService, private refDataService: RefDataService) { 
        this.roles = refDataService.getStaffRoles();
    }

    delete(): void {
        this.userService.deleteUser(this.model);
    }

    setRole(role: string): void {
        this.model.role = role;
        this.userService.updateUser(this.model.key, { role: role });
    }
}
