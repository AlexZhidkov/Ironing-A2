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

import { Price } from './price';


describe('Price', () => {
  let price: Price;

  beforeEach(() => {
    price = new Price();
    price.value = 1234;
  });

  it('should set value with provided 1234 param', () => {
    expect(price.name).toBe(1234);
  });
});
