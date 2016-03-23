import { Component } from 'angular2/core';
import { FormBuilder, ControlGroup, Validators } from 'angular2/common';
import { CanActivate } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { UserService } from 'core/user/user-service';
import { AuthService } from 'core/auth/auth-service';
import { IUser } from 'core/user/user';
import { ToasterContainerComponent, ToasterService } from 'angular2-toaster/angular2-toaster';

const template: string = require('./profile.html');

@Component({
    selector: 'profile',
    directives: [ToasterContainerComponent],
    providers: [ToasterService],
    template
})

@CanActivate(() => AuthRouteHelper.requireAuth() !== null)

export class Profile {
    profile: ControlGroup;
    builder: FormBuilder;
    person: IUser;

    constructor(private userService: UserService, private authService: AuthService, private toasterService: ToasterService, fb: FormBuilder) {
        this.person = authService.authenticated;
        this.profile = fb.group({
            'name': ['', Validators.required],
            'phone': ['', Validators.required],
            'email': ['', Validators.required],
            'twitter': ['', Validators.required],
            'address': ['', Validators.required]
        });
    }

    save(): void {
        this.userService.updateUser(this.person.key, this.person);
        this.toasterService.pop('success', 'Saved', 'Your profile information is updated');
    }
}
