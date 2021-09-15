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

  propertyChanged = new ReplaySubject<any>(1);

  @Input() property: Property<any>;
  @Input() parentNode: NodeComponent;

  @Output() slotClicked = new EventEmitter<{prop: NodeProperty, slot: SlotComponent}>();
  

  constructor() {
  }

  ngOnInit(): void {
    this.propertyChanged
  }

  public onSlotClicked(slot: SlotComponent) {
    this.slotClicked.emit({
      prop: this,
      slot: slot
    });
  }

  public logChange() {
    this.propertyChanged.next(this.property.binding);
  }

}
