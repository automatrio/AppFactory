import { ComponentFactoryResolver, Type, ViewContainerRef } from "@angular/core";

export abstract class Command {

    public abstract Execute(): void;
    public abstract Undo(): void;
    public abstract Redo(): void;

    public componentHost: ViewContainerRef;

    constructor(protected resolver: ComponentFactoryResolver) {};

    protected instantiate<T>(component: Type<T>) {
        const factory = this.resolver.resolveComponentFactory(component);
        const componentRef = this.componentHost.createComponent<T>(factory); 

        return componentRef;
    }
}
