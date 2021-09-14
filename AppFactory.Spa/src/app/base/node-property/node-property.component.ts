import { AfterViewInit, Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Property } from '../../common/models/property';
import { NodeViewportComponent } from '../node-viewport/node-viewport.component';
import { SlotComponent } from '../slot/slot.component';

@Component({
  selector: 'node-property',
  templateUrl: './node-property.component.html',
  styleUrls: ['./node-property.component.css']
})
export class NodeProperty implements OnInit {

  property: Property<any>;
  hasSlot: boolean;

  @HostBinding("style.--color")
    color: string;

  @Output() slotClicked = new EventEmitter<{prop: NodeProperty, slot: SlotComponent}>();

  constructor() {
    
  }

  ngOnInit(): void {
    this.color = this.property.color;
    this.hasSlot = this.property.hasSlot;
  }

  public onSlotClicked(slot: SlotComponent) {
    this.slotClicked.emit({
      prop: this,
      slot: slot
    });
  }

}
