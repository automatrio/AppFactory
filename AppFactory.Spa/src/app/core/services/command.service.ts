import { ComponentFactoryResolver, Injectable, RendererFactory2, Type, ViewContainerRef } from '@angular/core';
import { Command } from 'src/app/core/command/command';
import { CreateNodeCommand } from 'src/app/core/command/create-node.command';
import { CreateSpaghettiCommand } from 'src/app/core/command/create-spaghetti.command';
import { INode } from 'src/app/common/interfaces/node';
import { PageService } from 'src/app/pages/service/page.service';
import { DragNodeCommand } from '../command/drag-node-command';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private listLength: number = 8;

  currentCommandIndex = 0;
  listOfCommands: Command[] = new Array<Command>(this.listLength);

  constructor(
    private resolver: ComponentFactoryResolver,
    private renderer: RendererFactory2,
    private pageService: PageService
    ) { }

  ////////// PUBLIC METHODS ///////////

  public getNewNodeCreationCommand< T extends INode >(component: Type<T>) {
    const command = new CreateNodeCommand<T>(this.resolver);
    command.componentHost = this.pageService.viewportRef.nodeHost.viewContainerRef;
    command.component = component;
    this.insertCommandIntoList(command);
    return command;
  }

  public getNewSpaghettiCreationCommand() {
    const command = new CreateSpaghettiCommand(this.resolver, this.renderer);
    this.insertCommandIntoList(command);
    return command;
  } 

  public getNewDragNodeCommand() {
    const command = new DragNodeCommand(this.resolver);
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
