import { Component, ComponentFactoryResolver, ElementRef, HostBinding, OnInit, Type, ViewChild } from "@angular/core";
import { HostDirective } from "src/app/common/directives/host.directive";
import { CommandService } from "src/app/core/services/command.service";
import { Colors } from "src/app/global/colors";
import { DatabaseService } from "src/app/main/database/service/database.service";
import { NodeProperty } from "../node-property/node-property.component";
import { NodeComponent } from "../node/node.component";
import { SpaghettiComponent } from "../spaghetti/spaghetti.component";
import { SpaghettiService } from "../spaghetti/spaghetti.service";


@Component({
  selector: 'node-viewport',
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
    
  @ViewChild('spaghettiHost', {static: true}) spaghettiHost!: HostDirective;
  @ViewChild('nodeHost', {static: true}) nodeHost!: HostDirective;
  @ViewChild('container', {static: true}) container!: ElementRef<HTMLElement>;

  constructor(
    private spaghettiService: SpaghettiService,
    private databaseService: DatabaseService,
    private resolver: ComponentFactoryResolver) {
    this.colors = new Colors();
    this.spaghettiService.viewportRef = this;
  }

  ngOnInit(): void {
    this.subscribeToInstantiations();
    this.initializeAllSpaghettis();
    this.getBoundingRect();
  }

  ////////// PRIVATE METHODS //////////

  private subscribeToInstantiations() {
    this.spaghettiService.instantiationQueued$.subscribe(() => {
      this.spaghettiService.ongoingSpaghetti = this.instantiateSpaghetti();
    });

    this.databaseService.instantiationQueued$.subscribe(component => {
      this.instantiateNode(component);
    })
  }

  private initializeAllSpaghettis() {

  }

  private instantiateSpaghetti() {
    const componentRef = this.instantiate(SpaghettiComponent);
    componentRef.instance.binding$ = this.spaghettiService.currentData$; 

    return componentRef;
  }

  private instantiateNode(component: Type<unknown>) {
    const componentRef = this.instantiate(component);

    return componentRef;
  }

  private instantiate<T>(component: Type<T>) {
    const type = <T> <unknown> undefined;
    const factory = this.resolver.resolveComponentFactory(component);
    const vcRef = this.spaghettiHost.viewContainerRef;
    const componentRef = vcRef.createComponent<T>(factory); 

    return componentRef;
  }

  private getBoundingRect() {
    const rect = this.container.nativeElement.getBoundingClientRect();
    this.offset = {
      left: Math.round(rect.x) - 5,
      top: Math.round(rect.y) - 5
    };
  }
}
