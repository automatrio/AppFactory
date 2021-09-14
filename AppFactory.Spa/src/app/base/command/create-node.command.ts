import { ComponentRef, ViewContainerRef, Type, ComponentFactoryResolver, RendererFactory2 } from "@angular/core";
import { INode } from "src/app/common/interfaces/node";
import { Command } from "./command";

export class CreateNodeCommand< T extends INode > extends Command {


    private componentRef: ComponentRef<any>;

    component: Type<T>;

    constructor(protected resolver: ComponentFactoryResolver) {
        super(resolver);
    }

    /////////// PUBLIC METHODS ////////////

    public override Execute() {
        this.componentRef = this.instantiate<T>(this.component);
    }

    public Undo(): void {
        this.componentRef.destroy();
    }
    public Redo(): void {
        this.Execute();
    }
}