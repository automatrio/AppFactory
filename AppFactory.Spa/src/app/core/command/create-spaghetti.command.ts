import { ComponentFactoryResolver, ComponentRef, Renderer2, RendererFactory2 } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Point } from "src/app/common/interfaces/point";
import { SpaghettiData } from "src/app/common/interfaces/spaghetti-data";
import { SpaghettiPoints } from "src/app/common/interfaces/spaghetti-points";
import { Binding } from "src/app/common/models/binding";
import { NodeViewportComponent } from "../node-viewport/node-viewport.component";
import { SlotComponent } from "../slot/slot.component";
import { SpaghettiComponent } from "../spaghetti/spaghetti.component";
import { Command } from "./command";

export class CreateSpaghettiCommand extends Command {

    binding: Binding = new Binding();
    nodeViewport: NodeViewportComponent;
    spaghettiRef: ComponentRef<SpaghettiComponent>;

    private _unlistenMouseMove: () => void;
    private _renderer: Renderer2;

    currentData$ = new ReplaySubject<SpaghettiData>();

    constructor(
            protected resolver: ComponentFactoryResolver,
            private renderer: RendererFactory2) {
        super(resolver);
        this._renderer = renderer.createRenderer(null, null);
    }

    public Execute(): void {

        const source = 
        this.getOffset(
          this.getCenter(
            this.binding.inputSlot?.boxContainer.nativeElement
            ||
            this.binding.outputSlot?.boxContainer.nativeElement)
        );

        this.instantiateSpaghetti();
    
        this._unlistenMouseMove = this._renderer.listen(
          "document",
          "mousemove",
          (event: MouseEvent) => {
            const destination = this.getOffset({ x: event.x, y: event.y } as Point);
    
            this.currentData$
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

    public terminateSpaghetti(slot: SlotComponent | null, destroy: boolean) : Binding | null {
      this._unlistenMouseMove();
      this.storeSlot(slot);
      if(this.binding.isComplete()) {
        return this.binding;
      }
      else {
        if (destroy)
          this.spaghettiRef.destroy();
        return null;
      }
    }

    public storeSlot(slot: SlotComponent | null) : boolean {
      if(slot) {
        if(slot.type == "input") {
          this.binding.inputSlot = slot!;
        } 
        else if (slot.type == "output") {
          this.binding.outputSlot = slot!;
        }
        return true;
      }
      else {
        return false;
      }
    }
    
    ////////// PRIVATE METHODS //////////

    private getSpaghettiPoints(source: Point, destination: Point): SpaghettiData {

    const zoomScale = 1 / this.nodeViewport.zoom;

    const length = {
      width: destination.x - source.x,
      height: destination.y - source.y
    };

    const center = { x: source.x + ~~(length.width / 2), y: source.y + ~~(length.height / 2) };

    const points = {
      origin:     { x: (source.x)      * zoomScale,        y: (source.y)      * zoomScale },
      midhigh:    { x: (center.x)      * zoomScale,        y: (source.y)      * zoomScale },
      midcenter:  { x: (center.x)      * zoomScale,        y: (center.y)      * zoomScale },
      midlow:     { x: (center.x)      * zoomScale,        y: (destination.y) * zoomScale },
      end:        { x: (destination.x) * zoomScale,        y: (destination.y) * zoomScale }
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
    const center = {
      x: ~~(rect.left + (rect.right - rect.left) / 2),
      y: ~~(rect.top + (rect.bottom - rect.top) / 2)
    } as Point;
    return center;
  }

  private getOffset(point: Point): Point {
    const offset = this.nodeViewport.getAreaOffset();
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