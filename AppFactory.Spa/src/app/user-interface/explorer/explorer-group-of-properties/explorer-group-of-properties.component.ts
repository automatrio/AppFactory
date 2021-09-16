import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertyHostDirective } from 'src/app/common/directives/property-host.directive';

@Component({
  selector: 'app-explorer-group-of-properties',
  template: `
    <form class="example-form">
      <app-explorer-header headerTitle="{{headerTitle}}"></app-explorer-header>
      <div propertyHost></div>
    </form>`,
  styleUrls: ['../explorer.component.css']
})
export class ExplorerGroupOfPropertiesComponent implements OnInit {

  headerTitle: string;

  @ViewChild(PropertyHostDirective, {static: true}) propertyHost: PropertyHostDirective;

  constructor() { }

  ngOnInit(): void {
  }

}
