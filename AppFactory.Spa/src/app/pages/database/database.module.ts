import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseComponent } from './database.component';
import { DatabaseNodeComponent } from './nodes/database-node/database-node.component';
import { ContextNodeComponent } from './nodes/context-node/context-node.component';
import { CredentialsNodeComponent } from './nodes/credentials-node/credentials-node.component';
import { EnvironmentNodeComponent } from './nodes/environment-node/environment-node.component';
import { CoreModule } from 'src/app/core/core.module';
import { UserInterfaceModule } from 'src/app/user-interface/user-interface.module';
import { AngularMaterialModule } from 'src/app/common/angular-material.module';
import { CommonSharedModule } from 'src/app/common/common-shared.module';



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
    CoreModule,
    UserInterfaceModule,
    CommonSharedModule,
    AngularMaterialModule
  ]
})
export class DatabaseModule { }
