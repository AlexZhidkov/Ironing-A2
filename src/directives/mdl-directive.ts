// http://stackoverflow.com/questions/33386129/how-to-encapsulate-dynamically-added-elements-in-angular-2
import {Component, ElementRef } from 'angular2/core';
declare var componentHandler: any;


@Component({
    selector: '[mdl]',
    template: `<ng-content></ng-content>`
})



export class MdlComponent {

    constructor(public el: ElementRef) {
        MdlComponent.mdlWrapper(el);
    }

    static mdlWrapper(element: ElementRef): void {
        componentHandler.upgradeElement(element.nativeElement);
    }
}
