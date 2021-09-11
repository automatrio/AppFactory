import { AfterViewInit, Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { Property } from '../../common/interfaces/property';
import { NodeViewportComponent } from '../node-viewport/node-viewport.component';
import { SlotComponent } from '../slot/slot.component';

@Component({
  selector: 'node-property',
  templateUrl: './node-property.component.html',
  styleUrls: ['./node-property.component.css']
})
export class NodeProperty implements AfterViewInit {

  property: Property;
  public slot: SlotComponent;

  @HostBinding("style.--color")
    @Input() color: string;

  @ViewChild('inputSlot', {static: false}) private _inputSlot?: any;
  @ViewChild('outputSlot', {static: false}) private _outputSlot?: any;

  @Input() type: "input" | "output" = "output";
  private _viewportRef: NodeViewportComponent;

  @Output() slotClicked = new EventEmitter<{prop: NodeProperty, slot: SlotComponent}>();

  constructor(
    viewportRef: NodeViewportComponent) {
    this._viewportRef = viewportRef;
  }

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
    if(this.type == 'input') {
      this.slot = this._inputSlot;
    } 
    else if(this.type == 'output'){
      this.slot = this._outputSlot;
    }
  }

}
