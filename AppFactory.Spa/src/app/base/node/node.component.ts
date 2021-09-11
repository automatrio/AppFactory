import { Component, ComponentFactoryResolver, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { HostDirective } from 'src/app/common/directives/host.directive';
import { NodeViewportComponent } from 'src/app/base/node-viewport/node-viewport.component';
import { NodeProperty } from '../node-property/node-property.component';
import { SlotComponent } from '../slot/slot.component';
import { SpaghettiService } from '../spaghetti/spaghetti.service';
import { Property } from 'src/app/common/models/property';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: [
    './node.component.css',
    '../styles/bloom-box.scss',
    '../styles/bloom-box-interactable.scss',]
})
export class NodeComponent implements OnInit {

  protected _iconUrl: string;
  protected _title: string = "Title";
  protected _viewportRef: NodeViewportComponent;
  protected _properties: Property<any>[];

  @HostBinding("style.--color")
    protected _color: string;

  @ViewChild(HostDirective, {static: false}) private _propertiesHost: HostDirective;

  constructor(
    private resolver: ComponentFactoryResolver,
    private spaghettiService: SpaghettiService) { }

  ngOnInit(): void {
    this.createProperties();
  }

  public onSlotClicked(event: {prop: NodeProperty<any>, slot: SlotComponent}) {
    this.spaghettiService.createSpaghetti({
      node: this,
      prop: event.prop,
      slot: event.slot
    });
  }

  public onDragMoved(event: any){
    console.log(this._properties);
    this._properties.forEach(prop => {
      console.log("prop", prop);
    });
  }

  public get title() { return this._title }

  ////////// PRIVATE METHODS ///////////

  private createProperties() {
    this._properties.forEach(prop => {
      const type = prop.getType();
      console.log("type of prop", type);
      // const factory = this.resolver.resolveComponentFactory(NodeProperty<>);
      // const vcRef = this._propertiesHost.viewContainerRef;
      // const ref = vcRef.createComponent(factory);
    })
  }

}
