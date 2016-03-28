// menu file. Work by Dennis Smolek for showman.io
// https://github.com/justindujardin/ng2-material/issues/24
import {Component} from 'angular2/core';

@Component({
selector: 'md-menu',
host: {
'(click)': 'toggle()',
'[class.show-menu]': 'visible'
},
template: `
<ng-content></ng-content>
<md-backdrop class="md-backdrop"> </md-backdrop>
`
})
export class MdMenu {
visible: boolean = false;

toggle(): void {
this.visible = !this.visible;
}
}
