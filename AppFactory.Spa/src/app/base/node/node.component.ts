import { Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { HostDirective } from 'src/app/common/directives/host.directive';
import { NodeViewportComponent } from 'src/app/base/node-viewport/node-viewport.component';
import { NodeProperty } from '../node-property/node-property.component';
import { SlotComponent } from '../slot/slot.component';
import { SpaghettiService } from '../spaghetti/spaghetti.service';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: [
    './node.component.css',
    '../styles/bloom-box.scss',
    '../styles/bloom-box-interactable.scss',]
})
export class NodeComponent implements OnInit {

  @Input() title: string = "Title";
  @Input() viewportRef: NodeViewportComponent;
  @Input() properties: NodeProperty[];

  @HostBinding("style.--color")
    @Input() color: string;

  @ViewChild(HostDirective, {static: false}) propertiesHost: HostDirective;

  constructor(private spaghettiService: SpaghettiService) { }

  ngOnInit(/*inject componentresolverfCTORY*/): void {
  }

  public onSlotClicked(event: {prop: NodeProperty, slot: SlotComponent}) {
    this.spaghettiService.createSpaghetti({
      node: this,
      prop: event.prop,
      slot: event.slot
    });
  }

  public onDragMoved(event: any){
    console.log(this.properties);
    this.properties.forEach(prop => {
      console.log("prop", prop);
    });
  }


}
