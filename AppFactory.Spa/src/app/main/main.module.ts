import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseComponent } from './database/database.component';
import { BaseModule } from '../base/base.module';
import { DatabaseNodeComponent } from './database/nodes/database-node/database-node.component';
import { EnvironmentNodeComponent } from './database/nodes/environment-node/environment-node.component';
import { CredentialsNodeComponent } from './database/nodes/credentials-node/credentials-node.component';
import { ContextNodeComponent } from './database/nodes/context-node/context-node.component';



@NgModule({
  declarations: [
    DatabaseComponent,
    DatabaseNodeComponent,
    EnvironmentNodeComponent,
    CredentialsNodeComponent,
    ContextNodeComponent,
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
