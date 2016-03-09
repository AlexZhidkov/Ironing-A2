import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
  name: 'filterTasks',
  pure: true
})

export class TaskListFilterPipe implements PipeTransform {}
