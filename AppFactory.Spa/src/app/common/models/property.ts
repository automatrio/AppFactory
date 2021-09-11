import { Type } from "@angular/core";

export class Property<T> {

    constructor(name: string, binding?: T) {
        this.name = name;
        this.binding = binding;
    }

    name?: string;
    binding?: T;

    public getType(): T {
        return <T> <unknown> undefined;
    }
}