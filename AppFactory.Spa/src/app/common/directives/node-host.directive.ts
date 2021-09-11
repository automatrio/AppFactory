import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[nodeHost]'
})
export class NodeHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
