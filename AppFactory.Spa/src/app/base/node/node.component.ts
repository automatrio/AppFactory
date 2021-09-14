import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { NodeViewportComponent } from 'src/app/base/node-viewport/node-viewport.component';
import { NodeProperty } from '../node-property/node-property.component';
import { SlotComponent } from '../slot/slot.component';
import { SpaghettiService } from '../spaghetti/spaghetti.service';
import { Property } from 'src/app/common/models/property';
import { PageService } from 'src/app/pages/service/page.service';
import { PropertyHostDirective } from 'src/app/common/directives/property-host.directive';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: [
    './node.component.css',
    '../styles/bloom-box.scss',
    '../styles/bloom-box-interactable.scss',]
})
export class NodeComponent implements OnInit {

  @Input() entity: Record<string, any>;
  @Input() hasOutput: boolean;
  @Input() iconUrl: string;
  @Input() title: string;
  @Input() properties: Property<any>[];

  @HostBinding("style.--color")
    @Input() color: string;

  @ViewChild(SlotComponent, {static: false}) private outputSlot!: SlotComponent | null;
  @ViewChild(PropertyHostDirective, {static: true}) private propertyHost!: PropertyHostDirective;

  constructor(
    private resolver: ComponentFactoryResolver,
    private pageService: PageService,
    private spaghettiService: SpaghettiService) { }

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

  public onDragMoved(event: any){
    this.properties?.forEach(prop => {
    });
  }

  public assignToProperty(property: string, value: any) {
    this.entity[property] = value;
    // TICKET
    // Introduce error handling
  }

  ////////// PRIVATE METHODS ///////////

  private createProperties() {
    this.properties?.forEach(prop => {
      const type = prop.getType();
      const factory = this.resolver.resolveComponentFactory(NodeProperty);
      const vcRef = this.propertyHost.viewContainerRef;
      const componentRef = vcRef.createComponent(factory);
      componentRef.instance.property = prop;
    })
  }

}
