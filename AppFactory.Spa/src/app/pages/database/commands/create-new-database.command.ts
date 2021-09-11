import { Command } from "src/app/base/command/command";
import { DatabaseService } from "../service/database.service";

export class CreateNewDatabaseCommand extends Command {

    contructor(databaseService: DatabaseService) {

    }

    public Execute(): void {
        throw new Error("Method not implemented.");
    }
    public Undo(): void {
        throw new Error("Method not implemented.");
    }
    public Redo(): void {
        throw new Error("Method not implemented.");
    }

}