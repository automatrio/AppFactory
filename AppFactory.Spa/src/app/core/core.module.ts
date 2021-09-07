import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeViewportComponent } from './node-viewport/node-viewport.component';
import { BaseModule } from '../base/base.module';
import { SpaghettiComponent } from './spaghetti/spaghetti.component';
import { SpaghettiService } from './spaghetti/spaghetti.service';
import { SpaghettiHostDirective } from './node-viewport/spaghetti-host.directive';

@NgModule({
  declarations: [
    NodeViewportComponent,
    SpaghettiComponent,
    SpaghettiHostDirective,
  ],
  imports: [
    CommonModule,
    BaseModule,
  ],
  providers: [
    SpaghettiService
  ],
  exports: [
    NodeViewportComponent,
    SpaghettiHostDirective
  ]
})
export class CoreModule { }
