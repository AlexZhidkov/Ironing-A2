import { Component, Input } from 'angular2/core';
import { IPrice } from 'core/price/price';
import { PriceService } from 'core/price/price-service';
import { Autofocus } from 'directives/autofocus-directive';

const styles: string = require('./price-item.scss');
const template: string = require('./price-item.html');


@Component({
  directives: [
    Autofocus
  ],
  selector: 'price-item',
  styles: [styles],
  template
})

export class PriceItem {
  @Input() model: IPrice;

  editing: boolean = false;
  value: number = 0;

  constructor(private priceService: PriceService) {}

  delete(): void {
    this.priceService.deletePrice(this.model);
  }

  editTitle(): void {
    this.editing = true;
    this.value = this.model.value;
  }

  saveTitle(): void {
    if (this.editing) {
      const value: number = this.value;
      if (value > 0 && value !== this.model.value) {
        this.priceService.updatePrice(this.model, {value});
      }
      this.stopEditing();
    }
  }

  stopEditing(): void {
    this.editing = false;
  }

}
