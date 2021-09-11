import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[spaghettiHost]',
})
export class SpaghettiHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}