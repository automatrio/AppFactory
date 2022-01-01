import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { NodeViewportComponent } from 'src/app/core/node-viewport/node-viewport.component';
import { NodeProperty } from '../node-property/node-property.component';
import { SlotComponent } from '../slot/slot.component';
import { SpaghettiService } from '../services/spaghetti.service';
import { Property } from 'src/app/common/models/property';
import { PageService } from 'src/app/pages/service/page.service';
import { PropertyHostDirective } from 'src/app/common/directives/property-host.directive';
import { INode } from 'src/app/common/interfaces/node';
import { ExplorerService } from 'src/app/core/services/explorer.service';
import { SpaghettiComponent } from '../spaghetti/spaghetti.component';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { ReplaySubject } from 'rxjs';
import { Point } from 'src/app/common/interfaces/point';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: [
    './node.component.css',
    '../styles/bloom-box.scss',
    '../styles/bloom-box-interactable.scss',]
})
export class NodeComponent implements OnInit, INode {

  @Input() data: Record<string, any>;
  @Input() nodeType: string;
  @Input() entity: Record<string, any>;
  @Input() hasOutput: boolean;
  @Input() iconUrl: string;
  @Input() title: string;
  @Input() properties: Property<any>[];

  drag$ = new ReplaySubject<Point>(1);
  boundSpaghetti: ComponentRef<SpaghettiComponent>[] = [];

  @HostBinding("style.--color")
    @Input() color: string;

  @ViewChild("BoxContainer", {static: true}) private boxContainer: ElementRef<HTMLElement>;
  @ViewChild(SlotComponent, {static: false}) private outputSlot!: SlotComponent | null;
  @ViewChild(PropertyHostDirective, {static: true}) private propertyHost!: PropertyHostDirective;

  constructor(
    private resolver: ComponentFactoryResolver,
    private spaghettiService: SpaghettiService,
    private explorerService: ExplorerService) {
    }
  

  ngOnInit(): void {
    this.createProperties();
  }

  public onSlotClicked(event: {prop: NodeProperty, slot: SlotComponent}) {
    this.spaghettiService.createSpaghetti({
      node: this,
      prop: event.prop,
      slot: event.slot
    });
  }

  public onOutputSlotClicked() {
    this.spaghettiService.createSpaghetti({
      node: this,
      prop: this.properties,
      slot: this.outputSlot!
    });
  }

  public onDragStarted() {
    this.boundSpaghetti?.forEach(spaghetti => 
      spaghetti.instance.beginRelocation(this.drag$.asObservable())
    );
  }

  public onDragEnded() {
    this.boundSpaghetti.forEach(spaghetti => 
      spaghetti.instance.terminateRelocation()
    );
  }

  public onDragMoved(event: CdkDragMove<any>) {
    const point = {
      x: event.distance.x,
      y: event.distance.y
    } as Point;
    this.drag$.next(point);
  }

  public async onExplore() {
    await this.explorerService.explore(this);
  }

  ////////// PRIVATE METHODS ///////////

  private createProperties() {
    this.properties?.forEach(prop => {
      const factory = this.resolver.resolveComponentFactory(NodeProperty);
      const vcRef = this.propertyHost.viewContainerRef;
      const componentRef = vcRef.createComponent(factory);
      componentRef.instance.property = prop;
      componentRef.instance.parentNode = this;
    })
  }

}
