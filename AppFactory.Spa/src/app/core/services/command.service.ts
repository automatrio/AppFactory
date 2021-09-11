import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { Command, CreateNodeCommand } from 'src/app/base/command/command';
import { NodeComponent } from 'src/app/base/node/node.component';
import { DatabaseNodeComponent } from 'src/app/pages/database/nodes/database-node/database-node.component';
import { PageService } from 'src/app/pages/service/page.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private listLength: number = 8;

  currentCommandIndex = 0;
  listOfCommands: Command[] = new Array<Command>(this.listLength);

  constructor(
    private resolver: ComponentFactoryResolver,
    private pageService: PageService
    ) { }

  ////////// PUBLIC METHODS ///////////

  public getNewNodeCreationCommand< T extends NodeComponent >(component: Type<T>) {
    const command = new CreateNodeCommand<T>(this.resolver);
    command.viewContainerRef = this.pageService.viewportRef.nodeHost.viewContainerRef;
    command.component = component;
    this.insertCommandIntoList(command);
    return command;
  }

  /////////// PRIVATE METHODS //////////

  private insertCommandIntoList(command: Command) {
    this.listOfCommands[this.currentCommandIndex] = command;
    this.increaseIndex();
  }

  private increaseIndex() {
    if(this.currentCommandIndex < this.listLength) {
      this.currentCommandIndex++;
    }
    else {
      this.currentCommandIndex = 0;
    }
  }
  
}
