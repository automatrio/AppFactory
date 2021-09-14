import { ComponentFactoryResolver, ComponentRef, Renderer2, RendererFactory2 } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Point } from "src/app/common/interfaces/point";
import { SpaghettiData } from "src/app/common/interfaces/spaghetti-data";
import { SpaghettiPoints } from "src/app/common/interfaces/spaghetti-points";
import { NodeViewportComponent } from "../node-viewport/node-viewport.component";
import { SlotComponent } from "../slot/slot.component";
import { SpaghettiComponent } from "../spaghetti/spaghetti.component";
import { Command } from "./command";

export class CreateSpaghettiCommand extends Command {

    slot: SlotComponent;
    nodeViewport: NodeViewportComponent;
    spaghettiRef: ComponentRef<SpaghettiComponent>;

    private _unlistenMouseMove: () => void;
    private _renderer: Renderer2;

    private _currentDataSource = new ReplaySubject<SpaghettiData>();
    currentData$ = this._currentDataSource.asObservable();

    constructor(
            protected resolver: ComponentFactoryResolver,
            private renderer: RendererFactory2) {
        super(resolver);
        this._renderer = renderer.createRenderer(null, null);
    }

    public Execute(): void {

        const source = this.getCenter(this.slot.boxContainer.nativeElement);

        this.instantiateSpaghetti();
    
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
    public Undo(): void {
        throw new Error("Method not implemented.");
    }
    public Redo(): void {
        throw new Error("Method not implemented.");
    }

    public terminateSpaghetti(slot: SlotComponent | null) {
        this._unlistenMouseMove();
        if(!slot) {
          this.spaghettiRef.destroy();
        }
        else {
          console.log("Received slot", slot);
          slot.boundSpaghetti = this.spaghettiRef.instance;
        }
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
      width: this.nodeViewport.dimensions.width,
      height: this.nodeViewport.dimensions.height,
      points: points
    } as SpaghettiData;

  }

  private getCenter(element: HTMLElement): Point {
    const rect = element.getBoundingClientRect();
    const offset = this.nodeViewport.offset;
    const center = {
      x: ~~(rect.left + (rect.right - rect.left) / 2) - offset.left,
      y: ~~(rect.top + (rect.bottom - rect.top) / 2) - offset.top
    } as Point;
    return center;
  }

  private getOffset(point: Point): Point {
    const offset = this.nodeViewport.offset;
    return {
      x: ~~(point.x - offset.left),
      y: ~~(point.y - offset.top)
    } as Point;
  }

  private instantiateSpaghetti() {
    const componentRef = this.instantiate(SpaghettiComponent);
    componentRef.instance.binding$ = this.currentData$;
    this.spaghettiRef = componentRef;
  }

}