import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseComponent } from './database/database.component';
import { BaseModule } from '../base/base.module';



@NgModule({
  declarations: [
    DatabaseComponent,
  ],
  imports: [
    CommonModule,
    BaseModule
  ],
  exports: [
    DatabaseComponent,
  ]
})
export class MainModule { }
