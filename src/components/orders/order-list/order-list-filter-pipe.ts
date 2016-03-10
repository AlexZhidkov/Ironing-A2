import { Pipe, PipeTransform } from 'angular2/core';
import { IOrder } from 'core/order/order';


@Pipe({
  name: 'filterOrders',
  pure: true
})

export class OrderListFilterPipe implements PipeTransform {
  transform(list: IOrder[], filterType?: string[]): IOrder[] {
    if (!list || !filterType) {
      return list;
    }

    switch (filterType[0]) {
      case 'active':
        return list.filter((order: IOrder) => {
          return !order.completed;
        });

      case 'completed':
        return list.filter((order: IOrder) => {
          return order.completed;
        });

      default:
        return list;
    }
  }
}
