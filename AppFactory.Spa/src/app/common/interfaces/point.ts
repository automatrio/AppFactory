import { SpaghettiPoints } from "./spaghettiPoints";

export class Point {
    x: number;
    y: number;

    static CreateSVGArray (points: SpaghettiPoints) : string {
        let result: string;
        result  = "0,0 ";
        result += points.hmid.x   + "," + points.hmid.y   + " ";
        result += points.hlow.x   + "," + points.hlow.y   + " ";
        result += points.end.x    + "," + points.end.y;

        return result;
    }
}