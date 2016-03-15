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
  price: number = 0;

  constructor(private priceService: PriceService) {}

  delete(): void {
    this.priceService.deletePrice(this.model);
  }

  editPrice(): void {
    this.editing = true;
    this.price = this.model.price;
  }

  saveTitle(): void {
    if (this.editing) {
      const price: number = this.price;
      if (price > 0 && price !== this.model.price) {
        this.priceService.updatePrice(this.model.name, price );
      }
      this.stopEditing();
    }
  }

  stopEditing(): void {
    this.editing = false;
  }

}
