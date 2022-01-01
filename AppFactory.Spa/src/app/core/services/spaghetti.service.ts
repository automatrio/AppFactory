import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NodeComponent } from 'src/app/core/node/node.component';
import { SlotComponent } from 'src/app/core/slot/slot.component';
import { NodeViewportComponent } from '../node-viewport/node-viewport.component';
import { CommandService } from 'src/app/core/services/command.service';
import { PageService } from 'src/app/pages/service/page.service';
import { CreateSpaghettiCommand } from '../command/create-spaghetti.command';
import { ReplaySubject } from 'rxjs';
import { DataBindingService } from 'src/app/core/services/data-binding.service';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NodeViewportService } from './node-viewport.service';
import { SpaghettiComponent } from '../spaghetti/spaghetti.component';
import { Point } from 'src/app/common/interfaces/point';

export const SVG_PADDING = 10;

@Injectable({
  providedIn: 'root'
})
export class SpaghettiService {

  selectedSlot = new ReplaySubject<SlotComponent | null>(1);
  nodeViewport: NodeViewportComponent;
  scrollable: CdkScrollable;
  createCommand: CreateSpaghettiCommand;
  amountOfSlots: number = 0;
  collisionCheckIterations: number = 0;

  private listenToMouseUpQueuedSource = new ReplaySubject<MouseEvent>(1);
  listenToMouseUpQueued$ = this.listenToMouseUpQueuedSource.asObservable();

  private _renderer: Renderer2;
  private _unlistenToMouseUp: () => void;

  constructor(
    private pageService: PageService,
    private commandService: CommandService,
    private dataBindingService: DataBindingService,
    renderer: RendererFactory2
  ) {
    this._renderer = renderer.createRenderer(null, null);
    this.selectedSlot.subscribe(slot => {
      this.terminateSpaghetti(slot);
    })
  }

  ////////// PUBLIC METHODS //////////

  public createSpaghetti(event: {
    node: NodeComponent,
    prop: any | any[],
    slot: SlotComponent,
  }) {
    this.createCommand = this.commandService.getNewSpaghettiCreationCommand();
    this.createCommand.storeSlot(event.slot);
    this.createCommand.componentHost = this.pageService.viewportRef.spaghettiHost.viewContainerRef;
    this.createCommand.nodeViewport = this.nodeViewport;
    this._unlistenToMouseUp = this._renderer.listen("window", "mouseup", (event) => {this.onMouseUp(event)});
    this.createCommand.Execute();
  }

  public terminateSpaghetti(slot: SlotComponent | null) {
    this._unlistenToMouseUp();
    const destroy = this.collisionCheckIterations == this.amountOfSlots - 1;
    const binding = this.createCommand.terminateSpaghetti(slot, destroy);

    console.log("collisionCheckIterations: ", this.collisionCheckIterations, " x AmountOfSlots: ", this.amountOfSlots);

    if(binding) {
      this.dataBindingService.createBinding(binding);
      
    }
    else if(destroy)
      this.collisionCheckIterations = 0;
    else
      this.collisionCheckIterations++;
  }

  private onMouseUp(event: MouseEvent) {
    this.listenToMouseUpQueuedSource.next(event);
  }
}
