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

import { Staff } from './staff';


describe('Staff', () => {
  let staff: Staff;

  beforeEach(() => {
    staff = new Staff();
    staff.name = 'test';
  });

  it('should set name with provided `name` param', () => {
    expect(staff.name).toBe('test');
  });

});
