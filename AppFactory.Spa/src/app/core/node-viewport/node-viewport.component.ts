import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, NgZone, OnInit, Renderer2, RendererFactory2, ViewChild } from "@angular/core";
import { NodeHostDirective } from "src/app/common/directives/node-host.directive";
import { SpaghettiHostDirective } from "src/app/common/directives/spaghetti-host.directive";
import { Colors } from "src/app/global/colors";
import { SpaghettiComponent } from "../spaghetti/spaghetti.component";
import { SpaghettiService } from "../services/spaghetti.service";
import { CdkScrollable } from "@angular/cdk/scrolling";
import { Point } from "src/app/common/interfaces/point";
import { ReplaySubject } from "rxjs";
import { ifStmt } from "@angular/compiler/src/output/output_ast";
import { NodeViewportService } from "../services/node-viewport.service";


@Component({
  selector: 'node-viewport',
  templateUrl: './node-viewport.component.html',
  styleUrls: ['./node-viewport.component.css']
})
export class NodeViewportComponent implements AfterViewInit {

  @HostListener("mousedown", ["$event"])
  onPan(event: MouseEvent) {
    event.preventDefault();
    this.nodeViewportService.pan(event);
  }

  @HostListener("mousewheel", ["$event"])
  onZoom(event: WheelEvent) {
    event.preventDefault();
    this.nodeViewportService.zoom(event);
  }

  colors: Colors;
  offset: {
    left: number,
    top: number
  };
  dimensions = {
    width: 2000,
    height: 2000
  };

  @HostBinding('style.--viewport-width')
    viewportWidth: string = this.dimensions.width + 'px';

  @HostBinding('style.--viewport-height')
    viewportHeight: string = this.dimensions.height + 'px';

  @HostBinding('style.--zoom')
    zoom: number;

    
  @ViewChild(SpaghettiHostDirective, {static: true}) spaghettiHost!: SpaghettiHostDirective;
  @ViewChild(NodeHostDirective, {static: true}) nodeHost!: NodeHostDirective;
  @ViewChild(CdkScrollable, {static: true}) private scrollable!: CdkScrollable;
  @ViewChild('container', {static: true}) private container!: ElementRef<HTMLElement>;
 

  constructor(
      private spaghettiService: SpaghettiService,
      public nodeViewportService: NodeViewportService,
      ) {
    this.colors = new Colors();
    this.spaghettiService.nodeViewport = this;
    this.nodeViewportService.zoom$.subscribe(value => {
      this.zoom = value;
    });
  }

  ngAfterViewInit(): void {
    this.getBoundingRect();
    this.spaghettiService.scrollable = this.scrollable;
    this.nodeViewportService.scrollable = this.scrollable;
    this.nodeViewportService.viewportContainer = this.container.nativeElement;
  }

  ////////// PRIVATE METHODS //////////

  private getBoundingRect() {
    const rect = this.container.nativeElement.getBoundingClientRect();
    this.offset = {
      left: Math.round(rect.x) - 5,
      top: Math.round(rect.y) - 5
    };
  }
}
