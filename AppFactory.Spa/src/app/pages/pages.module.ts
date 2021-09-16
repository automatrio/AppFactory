import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from './database/service/database.service';
import { UserInterfaceModule } from '../user-interface/user-interface.module';
import { DatabaseModule } from './database/database.module';



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
