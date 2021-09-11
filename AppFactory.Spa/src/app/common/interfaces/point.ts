import { SpaghettiPoints } from "./spaghetti-points";

export class Point {
    x: number;
    y: number;

    static CreateSVGArray (points: SpaghettiPoints) : string {
        let result: string;
        result  = "M " + points.origin.x      + "," + points.origin.y    + " ";
        result += "Q " + points.midhigh.x     + "," + points.midhigh.y   + " ";
        result +=        points.midcenter.x   + "," + points.midcenter.y + " ";
        result +=        points.midlow.x      + "," + points.midlow.y    + " ";
        result +=        points.end.x         + "," + points.end.y       + " ";

        return result;
    }
}