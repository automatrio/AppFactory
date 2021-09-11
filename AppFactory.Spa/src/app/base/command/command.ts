export abstract class Command {

    protected _previousState: any;

    public abstract Execute(): void;
    public abstract Undo(): void;
    public abstract Redo(): void;

}