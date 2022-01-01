import { Injectable } from '@angular/core';
import { CommandService } from 'src/app/core/services/command.service';
import { DataService } from 'src/app/core/services/data.service';
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
    private dataService: DataService
    ) { }

    
  // createContext() {
  //   const command = this.commandService.getNewNodeCreationCommand<ContextNodeComponent>(DatabaseNodeComponent);
  //   command.Execute();
  // }

  public createCredentials() {
    const command = this.commandService.getNewNodeCreationCommand(CredentialsNodeComponent);
    this.dataService.appendNewNode(command.componentRef);
    command.Execute();
  }

  public createDatabase() {
    const command = this.commandService.getNewNodeCreationCommand(DatabaseNodeComponent);
    this.dataService.appendNewNode(command.componentRef);
    command.Execute();
  }

  public createEnvironment() {
    const command = this.commandService.getNewNodeCreationCommand(EnvironmentNodeComponent);
    this.dataService.appendNewNode(command.componentRef);
    command.Execute();
  }




}
