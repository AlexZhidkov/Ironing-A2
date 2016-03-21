import { Component, Input } from 'angular2/core';
import { IStaff } from 'core/staff/staff';
import { StaffService } from 'core/staff/staff-service';
import { Autofocus } from 'directives/autofocus-directive';

const styles: string = require('./staff-item.scss');
const template: string = require('./staff-item.html');


@Component({
  directives: [
    Autofocus
  ],
  selector: 'staff-item',
  styles: [styles],
  template
})

export class StaffItem {
  @Input() model: IStaff;

  constructor(private staffService: StaffService) {}

  delete(): void {
    this.staffService.deleteStaff(this.model);
  }

  setRole(role: string): void {
    this.model.role = role;
    this.staffService.updateStaff(this.model.key, {role: role});
  }

}
