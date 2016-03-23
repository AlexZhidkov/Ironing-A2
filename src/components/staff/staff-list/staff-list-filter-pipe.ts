import { Pipe, PipeTransform } from 'angular2/core';
import { IUser } from 'core/user/user';


@Pipe({
    name: 'filterStaff',
    pure: true
})

export class StaffListFilterPipe implements PipeTransform {
    transform(list: IUser[], filterType?: string[]): IUser[] {
        if (!list || !filterType) {
            return list;
        }
        return list.filter((staff: IUser) => {
            return staff.role === filterType[0];
        });
    }
}
