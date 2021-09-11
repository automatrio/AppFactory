import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HostDirective } from 'src/app/common/directives/host.directive';
import { NodeViewportComponent } from 'src/app/core/node-viewport/node-viewport.component';
import { SpaghettiComponent } from 'src/app/core/spaghetti/spaghetti.component';
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
  @Input() viewportRef: NodeViewportComponent;
  @Input() properties: NodeProperty[];

  @HostBinding("style.--color")
    @Input() color: string;

  @ViewChild(HostDirective, {static: false}) propertiesHost: HostDirective;

  constructor(private spaghettiService: SpaghettiService) { }

  ngOnInit(/*inject componentresolverfCTORY*/): void {
  }

  public onSlotClicked(event: {prop: NodeProperty, slot: Slot}) {
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
