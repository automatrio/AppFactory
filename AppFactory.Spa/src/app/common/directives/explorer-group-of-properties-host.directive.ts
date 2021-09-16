import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[explorerGroupOfPropertiesHost]'
})
export class ExplorerGroupOfPropertiesHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
