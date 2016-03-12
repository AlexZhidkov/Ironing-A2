import { Pipe, PipeTransform } from 'angular2/core';
import { IStaff } from 'core/staff/staff';


@Pipe({
  name: 'filterStaff',
  pure: true
})

export class StaffListFilterPipe implements PipeTransform {
  transform(list: IStaff[], filterType?: string[]): IStaff[] {
    if (!list || !filterType) {
      return list;
    }
    return list.filter((staff: IStaff) => {
          return staff.role === filterType[0];
    });
  }
}
