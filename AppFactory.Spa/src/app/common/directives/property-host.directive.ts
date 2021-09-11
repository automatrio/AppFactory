import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[propertyHost]'
})
export class PropertyHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
