import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NodeProperty } from 'src/app/base/node-property/node-property.component';
import { Node } from 'src/app/base/node/node.component';
import { Slot } from 'src/app/base/slot/slot.component';
import { SpaghettiData } from 'src/app/common/interfaces/spaghetti-data';
import { Point } from 'src/app/common/interfaces/point';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { SpaghettiPoints } from 'src/app/common/interfaces/spaghettiPoints';

@Injectable({
  providedIn: 'root'
})
export class SpaghettiService {

  private _coords = new SpaghettiPoints();
  private _currentData: SpaghettiData;
  private _data: SpaghettiData[];

  private _instantiationQueuedSource = new ReplaySubject<SpaghettiData>();
  instantiationQueued$ = this._instantiationQueuedSource.asObservable();

  selectedSlot = new ReplaySubject<Slot>(1);

  constructor() {
    this.selectedSlot.subscribe(slot => {
      this.terminateSpaghetti(slot.boxContainer.nativeElement as HTMLElement);
    })
  }

  ////////// PUBLIC METHODS //////////

  public createSpaghetti(event: {
    node: Node,
    prop: NodeProperty,
    slot: Slot,
  }) {
    const origin = this.getCenter(event.slot.boxContainer.nativeElement);
    this._coords.origin = origin;
  }

  public getSpaghettisData(index?: number) : SpaghettiData | SpaghettiData[] {
    if(index)
      return this._data[index];
    return this._data;
  }

  ////////// PRIVATE METHODS //////////

  private terminateSpaghetti(slot: HTMLElement) {
    const end = this.getCenter(slot);
    this._coords.end = end;
    this.getMiddlePoints();
    this.getOriginHeightWidthAndPoints()
    this.instantiateSpaghetti();

  }

   private getCenter(element: HTMLElement) : Point{
    const originRect = element.getBoundingClientRect();
    const center: Point = {
      x: Math.round(originRect.left + (originRect.right - originRect.left) / 2),
      y: Math.round(originRect.top + (originRect.bottom - originRect.top) / 2),
    };

    return center;
  }

  private getMiddlePoints() {
    const hmid = {
      x: Math.round((this._coords.end.x - this._coords.origin.x) / 2),
      y: 0
    };
    const hlow = {
      x: Math.round(hmid.x),
      y: Math.round(this._coords.end.y - this._coords.origin.y),
    };

    this._coords.hmid = hmid;
    this._coords.hlow = hlow;
  }

  private getOriginHeightWidthAndPoints() {
    this._currentData = {
      origin: this._coords.origin,
      height: Math.abs(this._coords.end.y - this._coords.origin.y),
      width: Math.abs(this._coords.end.x - this._coords.origin.x),
      points: Point.CreateSVGArray(this._coords)
    };
  }

  private instantiateSpaghetti() {
    this._instantiationQueuedSource.next(this._currentData);
  }
}
