import { Injectable } from '@angular/core';
import { CommandService } from 'src/app/core/services/command.service';
import { DatabaseModule } from '../database.module';
import { CredentialsNodeComponent } from '../nodes/credentials-node/credentials-node.component';
import { DatabaseNodeComponent } from '../nodes/database-node/database-node.component';
import { EnvironmentNodeComponent } from '../nodes/environment-node/environment-node.component';

@Injectable({
  providedIn: DatabaseModule
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
