import { Component, Input } from 'angular2/core';
import { IUser } from 'core/user/user';
import { UserService } from 'core/user/user-service';
import { Autofocus } from 'directives/autofocus-directive';

const styles: string = require('./client-item.scss');
const template: string = require('./client-item.html');


@Component({
    directives: [
        Autofocus
    ],
    selector: 'client-item',
    styles: [styles],
    template
})

export class ClientItem {
    @Input() model: IUser;
    @Input() isManager: boolean;

    constructor(private userService: UserService) {}

    makeStaff(): void {
        this.userService.updateUser(this.model.key, {role: 'staff'});
    }
}
