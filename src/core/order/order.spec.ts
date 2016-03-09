/* tslint:disable:no-unused-variable */
import {
  afterEach,
  beforeEach,
  describe,
  fdescribe,
  xdescribe,
  expect,
  it,
  fit,
  xit
} from 'angular2/testing';
/* tslint:enable:no-unused-variable */

import { Order } from './order';


describe('Order', () => {
  let order: Order;

  beforeEach(() => {
    order = new Order('test');
  });

  it('should set title with provided `title` param', () => {
    expect(order.title).toBe('test');
  });

  it('should set `completed` to `false`', () => {
    expect(order.completed).toBe(false);
  });

  it('should set `createdAt` to firebase timestamp placeholder', () => {
    expect(order.createdAt).toEqual(Firebase.ServerValue.TIMESTAMP);
  });
});
