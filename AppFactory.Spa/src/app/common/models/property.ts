import { Type } from "@angular/core";

export class Property<T> {

    constructor(name: string, binding: T, type: "input" | "output" ) {
        this.name = name;
        this.binding = binding;
        this.type = type;
    }

    name: string;
    binding: T;
    type: "input" | "output";

    public getType() {
        return <T> <unknown> undefined;
    }
}