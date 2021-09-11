import { Component, ComponentFactoryResolver, ElementRef, HostBinding, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NodeProperty } from 'src/app/base/node-property/node-property.component';
import { HostDirective } from 'src/app/common/directives/host.directive';
import { Colors } from 'src/app/global/colors';
import { SpaghettiComponent } from '../spaghetti/spaghetti.component';
import { SpaghettiService, SVG_PADDING } from '../spaghetti/spaghetti.service';

@Component({
  selector: 'app-node-viewport',
  templateUrl: './node-viewport.component.html',
  styleUrls: ['./node-viewport.component.css']
})
export class NodeViewportComponent implements OnInit {

  spaghettis: SpaghettiComponent[];
  colors: Colors;
  offset: {
    left: number,
    top: number
  };
  dimensions = {
    width: 2000,
    height: 2000
  };

  @HostBinding('style.--viewport-width')
    viewportWidth: string = this.dimensions.width + 'px';

  @HostBinding('style.--viewport-height')
    viewportHeight: string = this.dimensions.height + 'px'; 
    
  @ViewChild(HostDirective, {static: true}) spaghettiHost!: HostDirective;
  @ViewChild('container', {static: true}) container!: ElementRef<HTMLElement>;

  constructor(
    private spaghettiService: SpaghettiService,
    private resolver: ComponentFactoryResolver) {
    this.colors = new Colors();
    this.spaghettiService.viewportRef = this;
  }

  ngOnInit(): void {
    this.subscribeToSpaghettiInstantiation();
    this.initializeAllSpaghettis();
    this.getBoundingRect();
  }

  ////////// PRIVATE METHODS //////////

  private subscribeToSpaghettiInstantiation() {
    this.spaghettiService.instantiationQueued$.subscribe(() => {
      this.spaghettiService.ongoingSpaghetti = this.instantiateSpaghetti();
    });
  }

  private initializeAllSpaghettis() {

  }

  private instantiateSpaghetti() {
    const factory = this.resolver.resolveComponentFactory(SpaghettiComponent);
    const vcRef = this.spaghettiHost.viewContainerRef;
    const componentRef = vcRef.createComponent<SpaghettiComponent>(factory);

    componentRef.instance.binding$ = this.spaghettiService.currentData$; 

    return componentRef;
  }

  private getBoundingRect() {
    const rect = this.container.nativeElement.getBoundingClientRect();
    this.offset = {
      left: Math.round(rect.x) - 5,
      top: Math.round(rect.y) - 5
    };
  }

  ///////// TEMPORARY //////////

  tempProperties: NodeProperty[] = [
    new NodeProperty(this),
    new NodeProperty(this)
  ]

}
