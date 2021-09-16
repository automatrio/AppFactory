import { Component, ElementRef, HostBinding, OnInit, ViewChild } from "@angular/core";
import { NodeHostDirective } from "src/app/common/directives/node-host.directive";
import { SpaghettiHostDirective } from "src/app/common/directives/spaghetti-host.directive";
import { Colors } from "src/app/global/colors";
import { SpaghettiComponent } from "../spaghetti/spaghetti.component";
import { SpaghettiService } from "../services/spaghetti.service";


@Component({
  selector: 'node-viewport',
  templateUrl: './node-viewport.component.html',
  styleUrls: ['./node-viewport.component.css']
})
export class NodeViewportComponent implements OnInit {

  spaghettis: SpaghettiComponent[];
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
    
  @ViewChild(SpaghettiHostDirective, {static: true}) spaghettiHost!: SpaghettiHostDirective;
  @ViewChild(NodeHostDirective, {static: true}) nodeHost!: NodeHostDirective;
  @ViewChild('container', {static: true}) container!: ElementRef<HTMLElement>;

  constructor(
    private spaghettiService: SpaghettiService) {
    this.colors = new Colors();
    this.spaghettiService.nodeViewport = this;
  }

  ngOnInit(): void {
    this.getBoundingRect();
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
