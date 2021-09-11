import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { DirectivesModule } from './directives/directives.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DirectivesModule,
    AngularMaterialModule,
    FormsModule
  ],
  exports: [
    DirectivesModule,
    AngularMaterialModule,
    FormsModule
  ]
})
export class CommonSharedModule { }
