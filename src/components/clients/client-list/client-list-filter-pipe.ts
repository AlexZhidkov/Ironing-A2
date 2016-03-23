import { Pipe, PipeTransform } from 'angular2/core';
import { IUser } from 'core/user/user';


@Pipe({
    name: 'filterClients',
    pure: true
})

export class ClientListFilterPipe implements PipeTransform {
    transform(list: IUser[]): IUser[] {
        if (!list) return list;

        return list.filter((user: IUser) => {
            return user.role === 'client';
        });
     }
}
