import { ComponentRef, ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NodeProperty } from 'src/app/base/node-property/node-property.component';
import { NodeComponent } from 'src/app/base/node/node.component';
import { SlotComponent } from 'src/app/base/slot/slot.component';
import { SpaghettiData } from 'src/app/common/interfaces/spaghetti-data';
import { Point } from 'src/app/common/interfaces/point';
import { ReplaySubject } from 'rxjs';
import { SpaghettiPoints } from 'src/app/common/interfaces/spaghetti-points';
import { NodeViewportComponent } from '../node-viewport/node-viewport.component';
import { SpaghettiComponent } from './spaghetti.component';

export const SVG_PADDING = 10;

@Injectable({
  providedIn: 'root'
})
export class SpaghettiService {

  private _outputSlot: SlotComponent;
  private _inputSlot: SlotComponent;

  private _renderer: Renderer2;
  private _unlistenMouseMove: () => void;

  private _instantiationQueuedSource = new ReplaySubject<{ origin: Point }>();
  instantiationQueued$ = this._instantiationQueuedSource.asObservable();

  private _currentDataSource = new ReplaySubject<SpaghettiData>();
  currentData$ = this._currentDataSource.asObservable();

  selectedSlot = new ReplaySubject<SlotComponent | null>(1);
  viewportRef: NodeViewportComponent;
  ongoingSpaghetti: ComponentRef<SpaghettiComponent>;


  constructor(
    private rendererFactory: RendererFactory2
  ) {
    this._renderer = rendererFactory.createRenderer(null, null);
    this.selectedSlot.subscribe(slot => {
      this.terminateSpaghetti(slot);
    })
  }

  ////////// PUBLIC METHODS //////////

  public createSpaghetti(event: {
    node: NodeComponent,
    prop: NodeProperty,
    slot: SlotComponent,
  }) {
    this._outputSlot = event.slot;
    const source = this.getCenter(this._outputSlot.boxContainer.nativeElement);

    this._instantiationQueuedSource.next({ origin: source });
    this._unlistenMouseMove = this._renderer.listen(
      "document",
      "mousemove",
      (event: MouseEvent) => {
        const destination = this.getOffset({ x: event.x, y: event.y } as Point);

        this._currentDataSource
          .next(
            this.getSpaghettiPoints(source, destination)
          );
      });
  }

  ////////// PRIVATE METHODS //////////

  private getSpaghettiPoints(source: Point, destination: Point): SpaghettiData {

    const length = {
      width: destination.x - source.x,
      height: destination.y - source.y
    };

    const center = { x: source.x + ~~(length.width / 2), y: source.y + ~~(length.height / 2) };

    const points = {
      origin: { x: source.x, y: source.y },
      midhigh: { x: center.x, y: source.y },
      midcenter: { x: center.x, y: center.y },
      midlow: { x: center.x, y: destination.y },
      end: { x: destination.x, y: destination.y }
    } as SpaghettiPoints;

    return {
      origin: { x: 0, y: 0 },
      width: this.viewportRef.dimensions.width,
      height: this.viewportRef.dimensions.height,
      points: points
    } as SpaghettiData;

  }

  private terminateSpaghetti(slot: SlotComponent | null) {
    console.log("Receiving", slot);
    this._unlistenMouseMove();
    if(!slot) {
      this.ongoingSpaghetti.destroy();
    }
    else {
      slot.boundSpaghetti = this.ongoingSpaghetti.instance;
    }
  }

  private getCenter(element: HTMLElement): Point {
    const rect = element.getBoundingClientRect();
    const offset = this.viewportRef.offset;
    const center = {
      x: ~~(rect.left + (rect.right - rect.left) / 2) - offset.left,
      y: ~~(rect.top + (rect.bottom - rect.top) / 2) - offset.top
    } as Point;
    return center;
  }

  private getOffset(point: Point): Point {
    const offset = this.viewportRef.offset;
    return {
      x: ~~(point.x - offset.left),
      y: ~~(point.y - offset.top)
    } as Point;
  }

  private getMiddlePoints() {
  }
}
