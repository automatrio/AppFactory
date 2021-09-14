export class Property<T> {

    constructor(name: string, binding: T, hasSlot?: boolean, color?: string ) {
        this.name = name;
        this.binding = binding;
        this.hasSlot = hasSlot ?? false;
        this.color = color ?? "60,60,60";
    }

    name: string;
    binding: T;
    hasSlot: boolean;
    color: string;

    public getType() {
        return <T> <unknown> undefined;
    }
}