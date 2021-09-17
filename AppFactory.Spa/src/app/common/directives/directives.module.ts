import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaghettiHostDirective } from './spaghetti-host.directive';
import { NodeHostDirective } from './node-host.directive';
import { PropertyHostDirective } from './property-host.directive';
import { ExplorerGroupOfPropertiesHostDirective } from './explorer-group-of-properties-host.directive';
import { ExplorerNavigatorIconsHostDirective } from './explorer-navigator-icons-host.directive';



@NgModule({
  declarations: [
    SpaghettiHostDirective,
    NodeHostDirective,
    PropertyHostDirective,
    ExplorerGroupOfPropertiesHostDirective,
    ExplorerNavigatorIconsHostDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpaghettiHostDirective,
    NodeHostDirective,
    PropertyHostDirective,
    ExplorerGroupOfPropertiesHostDirective,
    ExplorerNavigatorIconsHostDirective
  ]
})
export class DirectivesModule { }
