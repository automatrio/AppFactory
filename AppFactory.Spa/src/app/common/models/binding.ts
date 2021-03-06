import { SlotComponent } from "src/app/core/slot/slot.component";

export class Binding {
    inputSlot: SlotComponent;
    outputSlot: SlotComponent;

    public isComplete() {
        return this.inputSlot && this.outputSlot;
    }
}