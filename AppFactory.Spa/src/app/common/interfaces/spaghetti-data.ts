import { Point } from "@angular/cdk/drag-drop";

export interface SpaghettiData {
    origin: Point; 
    height: number;
    width: number;
    points: string;
}