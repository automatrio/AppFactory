import { ComponentFactoryResolver, ComponentRef, Type, ViewContainerRef } from "@angular/core";
import { NodeComponent } from "../node/node.component";

export abstract class Command {

    protected _previousState: any;

    public abstract Execute(): void;
    public abstract Undo(): void;
    public abstract Redo(): void;

    constructor() {};
}

export class CreateNodeCommand< T extends NodeComponent > extends Command {


    private componentRef: ComponentRef<any>;

    viewContainerRef: ViewContainerRef;
    component: Type<T>;

    constructor(protected resolver: ComponentFactoryResolver) {
        super();
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

    /////////// PRIVATE METHODS ////////////

    private instantiate<T>(component: Type<T>) {
        const factory = this.resolver.resolveComponentFactory(component);
        const vcRef = this.viewContainerRef;
        const componentRef = vcRef.createComponent<T>(factory); 

        return componentRef;
    }
}
