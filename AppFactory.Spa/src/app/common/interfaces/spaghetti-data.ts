import { Point } from "@angular/cdk/drag-drop";
import { SpaghettiPoints } from "./spaghetti-points";

export interface SpaghettiData {
    origin: Point; 
    height: number;
    width: number;
    points: SpaghettiPoints;
}