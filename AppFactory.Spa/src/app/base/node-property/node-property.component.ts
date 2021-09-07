import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Property } from '../../common/interfaces/property';
import { Slot } from '../slot/slot.component';

@Component({
  selector: 'node-property',
  templateUrl: './node-property.component.html',
  styleUrls: ['./node-property.component.css']
})
export class NodeProperty implements OnInit {

  property: Property;

  @Input() type: "input" | "output";

  @HostBinding("style.--color")
    @Input() color: string;

  @Output() slotClicked = new EventEmitter<{prop: NodeProperty, slot: Slot}>();

  constructor() { }

  ngOnInit(): void {
  }

  public onSlotClicked(slot: Slot) {
    this.slotClicked.emit({
      prop: this,
      slot: slot
    });
  }

}
