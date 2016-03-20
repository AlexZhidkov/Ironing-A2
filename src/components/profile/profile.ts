import { Component } from 'angular2/core';
import { FormBuilder, ControlGroup, Validators } from 'angular2/common';
import { CanActivate } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { ProfileService } from 'core/profile/profile-service';
import { IStaff, Staff } from 'core/staff/staff';
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
    person: IStaff = new Staff();

  constructor(public profileService: ProfileService, private toasterService: ToasterService, fb: FormBuilder) {
    this.profileService.getStaff().then((staff) => {
        this.person = staff;
    });

        this.profile = fb.group({
            'name': ['', Validators.required],
            'email': ['', Validators.required],
            'phone': ['', Validators.required]
        });
  }

  save(): void {
      this.profileService.saveStaff(this.person);
      this.toasterService.pop('success', 'Saved', 'Your profile information is updated');
   }
   
}
