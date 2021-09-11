import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CreateNodeCommand } from 'src/app/base/command/command';
import { CommandService } from 'src/app/core/services/command.service';
import { CreateNewDatabaseCommand } from '../commands/create-new-database.command';
import { ContextNodeComponent } from '../nodes/context-node/context-node.component';
import { CredentialsNodeComponent } from '../nodes/credentials-node/credentials-node.component';
import { DatabaseNodeComponent } from '../nodes/database-node/database-node.component';
import { EnvironmentNodeComponent } from '../nodes/environment-node/environment-node.component';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private commandService: CommandService,
    ) { }

    
  // createContext() {
  //   const command = this.commandService.getNewNodeCreationCommand<ContextNodeComponent>(DatabaseNodeComponent);
  //   command.Execute();
  // }

  createCredentials() {
    const command = this.commandService.getNewNodeCreationCommand(CredentialsNodeComponent);
    command.Execute();
  }

  createDatabase() {
    const command = this.commandService.getNewNodeCreationCommand(DatabaseNodeComponent);
    command.Execute();
  }

  createEnvironment() {
    const command = this.commandService.getNewNodeCreationCommand(EnvironmentNodeComponent);
    command.Execute();
  }




}
