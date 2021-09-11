import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { DirectivesModule } from './directives/directives.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DirectivesModule,
    AngularMaterialModule
  ],
  exports: [
    DirectivesModule,
    AngularMaterialModule
  ]
})
export class CommonSharedModule { }
