import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaghettiHostDirective } from './spaghetti-host.directive';
import { NodeHostDirective } from './node-host.directive';
import { PropertyHostDirective } from './property-host.directive';



@NgModule({
  declarations: [
    SpaghettiHostDirective,
    NodeHostDirective,
    PropertyHostDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpaghettiHostDirective,
    NodeHostDirective,
    PropertyHostDirective
  ]
})
export class DirectivesModule { }
