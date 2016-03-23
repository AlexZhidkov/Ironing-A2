import { Pipe, PipeTransform } from 'angular2/core';
import { IUser } from 'core/user/user';

@Pipe({
    name: 'filterStaff',
    pure: true
})

export class StaffListFilterPipe implements PipeTransform {
    transform(list: IUser[], filterType?: string[]): IUser[] {
        if (!list) return list;
        console.log(filterType[0]);
        if (!filterType[0]) {
            return list.filter((staff: IUser) => {
                return staff.role !== 'client';
            });
        }
        return list.filter((staff: IUser) => {
            return staff.role === filterType[0];
        });
    }
}
