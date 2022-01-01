import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subscription } from 'rxjs';
import { Point } from 'src/app/common/interfaces/point';
import { SpaghettiData } from 'src/app/common/interfaces/spaghetti-data';
import { SlotComponent } from '../slot/slot.component';
import { SVG_PADDING } from '../services/spaghetti.service';
import { SpaghettiPoints } from 'src/app/common/interfaces/spaghetti-points';
import { SpaghettiHelper } from 'src/app/global/helpers/spaghetti.helper';
import { NodeViewportService } from '../services/node-viewport.service';
import { NodeViewportComponent } from '../node-viewport/node-viewport.component';

@Component({
  selector: 'spaghetti',
  templateUrl: './spaghetti.component.html',
  styleUrls: ['./spaghetti.component.css']
})
export class SpaghettiComponent implements OnInit {

  inputSlot: SlotComponent;
  outputSlot: SlotComponent;

  points: SpaghettiPoints;
  dimensions: {
    width: number,
    height: number
  };
  svgPoints: string;
  glow: number = 2;

  currentSubscription: Subscription;
  binding$ = new BehaviorSubject<SpaghettiData | null>(null);

  @HostBinding("style.--top")
    top: string;

  @HostBinding("style.--left")
    left: string;
    
  constructor(
    public elementRef: ElementRef,
    private nodeViewportService: NodeViewportService
    ) {}

  ngOnInit(): void {
    const el = (this.elementRef.nativeElement as HTMLElement);
    el.animate([{
      opacity: 0
    }, {
      opacity: 1
    }], 300).finished.then(() => {
      el.style.opacity = "1";
    });

    this.subscribeToConstructionDataBinding();
  }

  public beginRelocation(drag$: Observable<Point>, nodeType: "input" | "output" = "input") {
    const zoomLevel = this.nodeViewportService.zoom$.getValue();
    this.currentSubscription = drag$.subscribe(drag => {
      const origin = this.points.origin;
      const destination = {
        x: this.points.end.x + drag.x,
        y: this.points.end.y + drag.y
      };

      let data: SpaghettiData;
      if(nodeType === "input") {
        data = SpaghettiHelper.getSpaghettiPoints(
          origin,
          destination,
          zoomLevel,
          NodeViewportComponent.dimensions);
      } else {
        data = SpaghettiHelper.getSpaghettiPoints(
          destination,
          origin,
          zoomLevel,
          NodeViewportComponent.dimensions);
      }
      this.svgPoints = Point.CreateSVGArray(data.points);
    })
  }

  public terminateRelocation() {
    this.currentSubscription.unsubscribe();
  }

  public terminateConstruction() {
    this.currentSubscription.unsubscribe();
  }

  //////////// PRIVATE METHODS ///////////

  private subscribeToConstructionDataBinding() {
    this.currentSubscription = this.binding$.subscribe(data => {
      if(!data) return;
      this.points = data.points;
      this.dimensions = {
        width: data.width,
        height: data.height
      };
      this.top = data.origin.y - SVG_PADDING + "px";
      this.left = data.origin.x - SVG_PADDING + "px";
      this.svgPoints = Point.CreateSVGArray(data.points)
    });
  }
}
