import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tool } from './tool/tool.component';



@NgModule({
  declarations: [
    Tool
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Tool
  ]
})
export class BaseModule { }
