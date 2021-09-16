import { AfterViewInit, Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Property } from '../../common/models/property';
import { NodeViewportComponent } from '../node-viewport/node-viewport.component';
import { NodeComponent } from '../node/node.component';
import { SlotComponent } from '../slot/slot.component';

@Component({
  selector: 'node-property',
  templateUrl: './node-property.component.html',
  styleUrls: ['./node-property.component.css']
})
export class NodeProperty implements OnInit {

  @Input() property: Property<any>;
  @Input() parentNode: NodeComponent;

  @Output() slotClicked = new EventEmitter<{prop: NodeProperty, slot: SlotComponent}>();
  

  constructor() {
  }

  ngOnInit(): void {
  }

  public onSlotClicked(slot: SlotComponent) {
    this.slotClicked.emit({
      prop: this,
      slot: slot
    });
  }

}
