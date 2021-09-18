import { CdkScrollable } from '@angular/cdk/scrolling';
import { HostListener, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Point } from 'src/app/common/interfaces/point';


export const ZOOM_INCREMENT = 0.1;

@Injectable({
  providedIn: 'root'
})
export class NodeViewportService {
  
  private _renderer: Renderer2;
  private _unlistenMouseMove: () => void;
  private _unlistenMouseUp: () => void;

  pan$ = new ReplaySubject<{originalCoordinates: Point, originalScroll: Point} | null>(1);
  viewportContainer: HTMLElement;
  scrollable: CdkScrollable;

  zoom$ = new BehaviorSubject<number>(1);


  constructor(renderer: RendererFactory2) {
    this._renderer = renderer.createRenderer(null, null);
    this.subscribeToPanning();
  }

  /////////// PUBLIC METHODS //////////

  public zoom(event: WheelEvent) {
    const previousValue = this.zoom$.getValue();
    const increment = (event as any).wheelDelta > 0
      ?  ZOOM_INCREMENT
      : -ZOOM_INCREMENT;
    const endValue = previousValue + increment;

    console.log("increment", increment);

    if(endValue < 0.3 || endValue > 1.6) {
      this.zoom$.next(previousValue);
      return;
    }
    this.zoom$.next(endValue);
  }

  public pan(event: MouseEvent) {
    const originalCoordinates: Point = {
      x: event.x,
      y: event.y
    };
    const originalScroll: Point = {
      x: this.scrollable.measureScrollOffset("left"),
      y: this.scrollable.measureScrollOffset("top")
    };

    if(event.button === 1)
      this.pan$.next({originalCoordinates, originalScroll});
  }

  public releasePan() {
    if(this._unlistenMouseMove)
      this._unlistenMouseMove();
  }

  ////////// PRIVATE METHODS //////////

  private subscribeToPanning() {
    this.pan$.subscribe(points => {
      this._unlistenMouseUp = this._renderer.listen(
        "document", 
        "mouseup",
        () => {
          this._unlistenMouseMove();
          this._unlistenMouseUp;
        });

      this._unlistenMouseMove = this._renderer.listen(
        "document", 
        "mousemove",
        (mousemove) => {

          const offset: Point = {
            x: (-1) * (mousemove.x - points!.originalCoordinates.x) + points!.originalScroll.x,
            y: (-1) * (mousemove.y - points!.originalCoordinates.y) + points!.originalScroll.y
          };

          this.viewportContainer.scroll(offset.x, offset.y);
        });

      });
  }
}
