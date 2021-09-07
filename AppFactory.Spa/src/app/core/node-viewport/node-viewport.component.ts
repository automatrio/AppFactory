import { Component, ComponentFactoryResolver, OnInit, Type, ViewChild } from '@angular/core';
import { SpaghettiData } from 'src/app/common/interfaces/spaghetti-data';
import { Colors } from 'src/app/global/colors';
import { SpaghettiComponent } from '../spaghetti/spaghetti.component';
import { SpaghettiService } from '../spaghetti/spaghetti.service';
import { SpaghettiHostDirective } from './spaghetti-host.directive';

@Component({
  selector: 'app-node-viewport',
  templateUrl: './node-viewport.component.html',
  styleUrls: ['./node-viewport.component.css']
})
export class NodeViewportComponent implements OnInit {
  
  spaghettis: SpaghettiComponent[];
  colors: Colors;

  @ViewChild(SpaghettiHostDirective, {static: true}) spaghettiHost!: SpaghettiHostDirective;

  constructor(
    private spaghettiService: SpaghettiService,
    private resolver: ComponentFactoryResolver) {
    this.colors = new Colors();
  }

  ngOnInit(): void {
    this.subscribeToSpaghettiInstantiation();
    this.initializeAllSpaghettis();
  }

  ////////// PRIVATE METHODS //////////

  private subscribeToSpaghettiInstantiation() {
    this.spaghettiService.instantiationQueued$.subscribe(data => {
      this.instantiateSpaghetti(data);
    });
  }

  private initializeAllSpaghettis() {

  }

  private instantiateSpaghetti(data: SpaghettiData) {
    console.log("Imma instantiate spaghheti!")
    const factory = this.resolver.resolveComponentFactory(SpaghettiComponent);
    const vcRef = this.spaghettiHost.viewContainerRef;
    const componentRef = vcRef.createComponent<SpaghettiComponent>(factory);
    componentRef.instance.elementRef.nativeElement
    componentRef.instance.left = data.origin.x + "px";
    componentRef.instance.top = data.origin.y + "px";
    componentRef.instance.data = data;
  }

}
