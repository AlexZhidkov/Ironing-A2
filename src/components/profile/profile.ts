import { Component } from 'angular2/core';
import { FormBuilder, ControlGroup, Validators } from 'angular2/common';
import { CanActivate } from 'angular2/router';
import { AuthRouteHelper } from 'core/auth/auth-route-helper';
import { ProfileService } from 'core/profile/profile-service';

const template: string = require('./profile.html');

@Component({
  selector: 'profile',
  template
})

@CanActivate(() => AuthRouteHelper.requireAuth())

export class Profile {
    profile: ControlGroup;
    builder: FormBuilder;

  constructor(public profileService: ProfileService, fb: FormBuilder) {
        this.profile = fb.group({
            'name': ['', Validators.required],
            'email': ['', Validators.required],
            'phone': ['', Validators.required]
        });

    this.profile.valueChanges.subscribe((value: any) => {
        this.profileService.getRef().set(value);
    }.bind(this));
  }
}
