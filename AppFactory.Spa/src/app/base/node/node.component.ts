import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { SpaghettiService } from 'src/app/core/spaghetti/spaghetti.service';
import { NodeProperty } from '../node-property/node-property.component';
import { Slot } from '../slot/slot.component';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: [
    './node.component.css',
    '../styles/bloom-box.scss',
    '../styles/bloom-box-interactable.scss',]
})
export class Node implements OnInit {

  @Input() title: string = "Title";
  
  @HostBinding("style.--color")
    @Input() color: string;

  constructor(private spaghettiService: SpaghettiService) { }

  ngOnInit(): void {
  }

  public onSlotClicked(event: {prop: NodeProperty, slot: Slot}) {
    this.spaghettiService.createSpaghetti({
      node: this,
      prop: event.prop,
      slot: event.slot
    });
  }

}
