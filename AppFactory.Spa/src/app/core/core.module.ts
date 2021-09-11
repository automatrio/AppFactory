import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeViewportComponent } from './node-viewport/node-viewport.component';
import { BaseModule } from '../base/base.module';
import { SpaghettiComponent } from './spaghetti/spaghetti.component';
import { SpaghettiService } from './spaghetti/spaghetti.service';
import { CommonSharedModule } from '../common/common-shared.module';

@NgModule({
  declarations: [
    NodeViewportComponent,
    SpaghettiComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    CommonSharedModule
  ],
  providers: [
    SpaghettiService
  ],
  exports: [
    NodeViewportComponent
  ]
})
export class CoreModule { }
