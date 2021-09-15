import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NodeComponent } from 'src/app/base/node/node.component';
import { SlotComponent } from 'src/app/base/slot/slot.component';
import { NodeViewportComponent } from '../node-viewport/node-viewport.component';
import { CommandService } from 'src/app/core/services/command.service';
import { PageService } from 'src/app/pages/service/page.service';
import { CreateSpaghettiCommand } from '../command/create-spaghetti.command';
import { ReplaySubject } from 'rxjs';
import { DataBindingService } from 'src/app/core/services/data-binding.service';

export const SVG_PADDING = 10;

@Injectable({
  providedIn: 'root'
})
export class SpaghettiService {

  selectedSlot = new ReplaySubject<SlotComponent | null>(1);
  nodeViewport: NodeViewportComponent;
  command: CreateSpaghettiCommand;
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
    this.command = this.commandService.getNewSpaghettiCreationCommand();
    this.command.storeSlot(event.slot);
    this.command.componentHost = this.pageService.viewportRef.spaghettiHost.viewContainerRef;
    this.command.nodeViewport = this.nodeViewport;
    this._unlistenToMouseUp = this._renderer.listen("window", "mouseup", (event) => {this.onMouseUp(event)});
    this.command.Execute();
  }

  public terminateSpaghetti(slot: SlotComponent | null) {
    this._unlistenToMouseUp();
    const destroy = this.collisionCheckIterations > this.amountOfSlots;
    const binding = this.command.terminateSpaghetti(slot, destroy);

    if(binding)
      this.dataBindingService.createBinding(binding);
    
  }

  private onMouseUp(event: MouseEvent) {
    this.listenToMouseUpQueuedSource.next(event);
  }
}
