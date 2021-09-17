import { Component, HostBinding, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PropertyHostDirective } from 'src/app/common/directives/property-host.directive';
import { ExplorerService } from 'src/app/core/services/explorer.service';
import { STAGGER_CHILDREN } from '../animations/explorer-animations';
import { ExplorerPropertyComponent } from '../explorer-property/explorer-property.component';

@Component({
  selector: 'app-explorer-group-of-properties',
  template: `
    <form [@animationContainer]="properties.length">
      <app-explorer-header
        [headerTitle]="headerTitle"></app-explorer-header>
      <ng-container propertyHost></ng-container>
    </form>`,
  styleUrls: ['../explorer.component.css'],
  animations: STAGGER_CHILDREN
})
export class ExplorerGroupOfPropertiesComponent implements OnInit {

  headerTitle: string;
  properties: ExplorerPropertyComponent[] = [];

  @ViewChild(PropertyHostDirective, {static: true}) propertyHost: PropertyHostDirective;

  constructor(public explorerService:ExplorerService) { }

  ngOnInit(): void {
  }

}
