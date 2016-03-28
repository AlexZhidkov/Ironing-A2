import { Component, Input } from 'angular2/core';
import { IOrder } from 'core/order/order';
import { OrderService } from 'core/order/order-service';
import { Autofocus } from 'directives/autofocus-directive';
import { MdMenu } from 'directives/md-menu';

const styles: string = require('./order-item.scss');
const template: string = require('./order-item.html');


@Component({
  directives: [
    Autofocus,
    MdMenu
  ],
  selector: 'order-item',
  styles: [styles],
  template
})

export class OrderItem {
  @Input() model: IOrder;

  editing: boolean = false;
  name: string = '';

  constructor(private orderService: OrderService) {}

  assignDriver(name: string): void {
       this.model.assignedTo = name;
       this.orderService.updateOrder(this.model, { assignedTo: name });
  }

  delete(): void {
    this.orderService.deleteOrder(this.model);
  }

  editTitle(): void {
    this.editing = true;
    this.name = this.model.name;
  }

  saveTitle(): void {
    if (this.editing) {
      const name: string = this.name.trim();
      if (name.length && name !== this.model.name) {
        this.orderService.updateOrder(this.model, {name});
      }
      this.stopEditing();
    }
  }

  stopEditing(): void {
    this.editing = false;
  }

  toggleStatus(): void {
    this.orderService.updateOrder(this.model, {
      completed: !this.model.completed
    });
  }
}
