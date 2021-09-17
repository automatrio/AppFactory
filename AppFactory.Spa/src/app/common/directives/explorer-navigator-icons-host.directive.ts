import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[explorerNavigatorIconsHost]'
})
export class ExplorerNavigatorIconsHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
