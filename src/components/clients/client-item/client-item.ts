import { Component, Input } from 'angular2/core';
import { IClient } from 'core/client/client';
import { ClientService } from 'core/client/client-service';
import { Autofocus } from 'directives/autofocus-directive';

const styles: string = require('./client-item.scss');
const template: string = require('./client-item.html');


@Component({
  directives: [
    Autofocus
  ],
  selector: 'client-item',
  styles: [styles],
  template
})

export class ClientItem {
  @Input() model: IClient;

  editing: boolean = false;

  constructor(private clientService: ClientService) {}

  delete(): void {
    this.clientService.deleteClient(this.model);
  }
}
