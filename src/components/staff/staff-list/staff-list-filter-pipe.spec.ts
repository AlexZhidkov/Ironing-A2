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

import { StaffListFilterPipe } from './staff-list-filter-pipe';


describe('StaffListFilterPipe', () => {
  let pipe: StaffListFilterPipe;
  let list: any[];

  beforeEach(() => {
    list = [{completed: true}, {completed: false}];
    pipe = new StaffListFilterPipe();
  });

  it('should return provided list if list is undefined and filter is provided', () => {
    list = undefined;
    expect(pipe.transform(list, ['driver'])).toBe(list);
  });
});
