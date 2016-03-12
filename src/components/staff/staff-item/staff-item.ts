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
  name: string = '';

  constructor(private staffService: StaffService) {}

  delete(): void {
    this.staffService.deleteStaff(this.model);
  }

  editTitle(): void {
    this.editing = true;
    this.name = this.model.name;
  }

  saveTitle(): void {
    if (this.editing) {
      const name: string = this.name.trim();
      if (name.length && name !== this.model.name) {
        this.staffService.updateStaff(this.model, {name});
      }
      this.stopEditing();
    }
  }

  stopEditing(): void {
    this.editing = false;
  }
}
