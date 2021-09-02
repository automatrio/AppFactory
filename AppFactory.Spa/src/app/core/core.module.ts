import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeViewportComponent } from './node-viewport/node-viewport.component';

@NgModule({
  declarations: [
    NodeViewportComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NodeViewportComponent
  ]
})
export class CoreModule { }
