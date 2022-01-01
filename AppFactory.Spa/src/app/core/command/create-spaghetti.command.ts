import { ComponentFactoryResolver, ComponentRef, Renderer2, RendererFactory2 } from "@angular/core";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { Point } from "src/app/common/interfaces/point";
import { SpaghettiData } from "src/app/common/interfaces/spaghetti-data";
import { SpaghettiPoints } from "src/app/common/interfaces/spaghetti-points";
import { Binding } from "src/app/common/models/binding";
import { SpaghettiHelper } from "src/app/global/helpers/spaghetti.helper";
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

  currentData$ = new BehaviorSubject<SpaghettiData | null>(null);

  constructor(
          protected resolver: ComponentFactoryResolver,
          private renderer: RendererFactory2) {
      super(resolver);
      this._renderer = renderer.createRenderer(null, null);
  }

  public Execute(): void {

      const source = 
        this.getPoint(
          this.binding.inputSlot?.boxContainer.nativeElement
          ||
          this.binding.outputSlot?.boxContainer.nativeElement
          );
      const zoomScale = 1 / this.nodeViewport.zoom;

      this.instantiateSpaghetti();
  
      this._unlistenMouseMove = this._renderer.listen(
        "document",
        "mousemove",
        (event: MouseEvent) => {
          const destination = this.getOffset({ x: event.x, y: event.y } as Point);
          this.currentData$
            .next(
              this.getSpaghettiPoints(source, destination, zoomScale)
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
    const source = 
    this.getPoint(
      this.binding.inputSlot?.boxContainer.nativeElement
      ||
      this.binding.outputSlot?.boxContainer.nativeElement
    );
    const zoomScale = 1 / this.nodeViewport.zoom;

    this.storeSlot(slot);

    if(this.binding.isComplete()) {
      if(slot) {
        const destination = this.getPoint(slot.boxContainer.nativeElement);
        this.currentData$
          .next(
            this.getSpaghettiPoints(source, destination, zoomScale)
          );
      }

      this.bindSpaghettiToNodes();
      this.spaghettiRef.instance.terminateConstruction();
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

  private getPoint(element: HTMLElement) {
    return this.getOffset(this.getCenter(element));
  }

  private getSpaghettiPoints(source: Point, destination: Point, zoomScale: number): SpaghettiData {   
    return SpaghettiHelper.getSpaghettiPoints(source, destination, zoomScale, NodeViewportComponent.dimensions);
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
      x: ~~(point.x - offset.left) + 8,
      y: ~~(point.y - offset.top) + 8
    } as Point;
  }

  private instantiateSpaghetti() {
    const componentRef = this.instantiate(SpaghettiComponent);
    componentRef.instance.binding$ = this.currentData$;
    this.spaghettiRef = componentRef;
  }

  private bindSpaghettiToNodes() {
    this.binding.inputSlot.parentNode.boundSpaghetti.push(this.spaghettiRef);
    this.binding.outputSlot.parentNode.boundSpaghetti.push(this.spaghettiRef);
  }

}