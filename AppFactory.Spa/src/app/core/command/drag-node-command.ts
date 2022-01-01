import { Command } from "./command";

export class DragNodeCommand extends Command {


    
    public Execute(): void {
        
    }

    public Undo(): void {
        throw new Error("Method not implemented.");
    }
    public Redo(): void {
        throw new Error("Method not implemented.");
    }

}