import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from '../base/base.module';
import { CommonSharedModule } from '../common/common-shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BaseModule,
    CommonSharedModule
  ],
  providers: [
  ],
  exports: [
  ]
})
export class CoreModule { }
