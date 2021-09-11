import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tool } from './tool/tool.component';
import { Node } from './node/node.component';
import { AngularMaterialModule } from '../common/angular-material.module';
import { NodeProperty } from './node-property/node-property.component';
import { Slot } from './slot/slot.component';
import { CommonSharedModule } from '../common/common-shared.module';



@NgModule({
  declarations: [
    Tool,
    Node,
    NodeProperty,
    Slot
  ],
  imports: [
    CommonModule,
    CommonSharedModule,
    AngularMaterialModule
  ],
  exports: [
    Tool,
    Node
  ]
})
export class BaseModule { }
