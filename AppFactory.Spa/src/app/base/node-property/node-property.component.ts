import { AfterViewInit, Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { Property } from '../../common/models/property';
import { NodeViewportComponent } from '../node-viewport/node-viewport.component';
import { SlotComponent } from '../slot/slot.component';

@Component({
  selector: 'node-property',
  templateUrl: './node-property.component.html',
  styleUrls: ['./node-property.component.css']
})
export class NodeProperty implements AfterViewInit {

  property: Property<any>;
  slot: SlotComponent;

  @HostBinding("style.--color")
    color: string;

  @ViewChild('inputSlot', {static: false}) private _inputSlot?: any;
  @ViewChild('outputSlot', {static: false}) private _outputSlot?: any;

  @Output() slotClicked = new EventEmitter<{prop: NodeProperty, slot: SlotComponent}>();

  constructor() {}

  ngAfterViewInit(): void {
    this.getSlot();
  }

  public onSlotClicked(slot: SlotComponent) {
    this.slotClicked.emit({
      prop: this,
      slot: slot
    });
  }

  private getSlot() {
    if(this.property.type == 'input') {
      this.slot = this._inputSlot;
    } 
    else if(this.property.type == 'output'){
      this.slot = this._outputSlot;
    }
  }

}
