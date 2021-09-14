import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, HostBinding, OnInit, Type, ViewChild } from "@angular/core";
import { NodeHostDirective } from "src/app/common/directives/node-host.directive";
import { SpaghettiHostDirective } from "src/app/common/directives/spaghetti-host.directive";
import { CommandService } from "src/app/core/services/command.service";
import { Colors } from "src/app/global/colors";
import { DatabaseService } from "src/app/pages/database/service/database.service";
import { NodeProperty } from "../node-property/node-property.component";
import { NodeComponent } from "../node/node.component";
import { SpaghettiComponent } from "../spaghetti/spaghetti.component";
import { SpaghettiService } from "../spaghetti/spaghetti.service";


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
