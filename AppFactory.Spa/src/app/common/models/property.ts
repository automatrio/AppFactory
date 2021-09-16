export class Property<T> {

    constructor(name: string, nodeData: any, binding: string, hasSlot?: boolean, color?: string ) {
        this.name = name;
        this.nodeData = nodeData;
        this.binding = binding;
        this.hasSlot = hasSlot ?? false;
        this.color = color ?? "60,60,60";
    }

    name: string;
    nodeData: Record<string, any>;
    binding: string;
    hasSlot: boolean;
    color: string;

    // data: T = new T();


    public getType() {
        return <T> <unknown> undefined;
    }
}