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

  editing: boolean = false;
  role: string = '';

  constructor(private staffService: StaffService) {}

  delete(): void {
    this.staffService.deleteStaff(this.model);
  }

  edit(): void {
    this.editing = true;
    this.role = this.model.role;
  }

  save(): void {
    if (this.editing) {
      const role: string = this.role.trim();
      if (role.length && role !== this.model.role) {
        this.staffService.updateStaff(this.model, {role});
      }
      this.stopEditing();
    }
  }

  stopEditing(): void {
    this.editing = false;
  }
}
