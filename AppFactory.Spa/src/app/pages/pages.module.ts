import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from './database/service/database.service';
import { DatabaseModule } from './database/database.module';
import { UserInterfaceModule } from '../user-interface/general.module';



@NgModule({
  imports: [
    CommonModule,
    DatabaseModule
  ],
  providers: [
    UserInterfaceModule,
    DatabaseService,
  ],
  exports: [
    UserInterfaceModule
  ]
})
export class PagesModule { }
