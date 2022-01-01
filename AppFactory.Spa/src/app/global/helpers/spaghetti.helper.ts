import { Point } from "src/app/common/interfaces/point";
import { SpaghettiData } from "src/app/common/interfaces/spaghetti-data";
import { SpaghettiPoints } from "src/app/common/interfaces/spaghetti-points";
import { NodeViewportComponent } from "src/app/core/node-viewport/node-viewport.component";

export class SpaghettiHelper {

    public static getSpaghettiPoints(
        source: Point,
        destination: Point,
        zoomScale: number,
        nodeViewportDimensions: {
            width: number, height: number
        }) {
            
        const length = {
            width: destination.x - source.x,
            height: destination.y - source.y
        };
      
        const center = { x: source.x + ~~(length.width / 2), y: source.y + ~~(length.height / 2) };
    
        const points = {
            origin:     { x: (source.x)      * zoomScale,        y: (source.y)      * zoomScale },
            midhigh:    { x: (center.x)      * zoomScale,        y: (source.y)      * zoomScale },
            midcenter:  { x: (center.x)      * zoomScale,        y: (center.y)      * zoomScale },
            midlow:     { x: (center.x)      * zoomScale,        y: (destination.y) * zoomScale },
            end:        { x: (destination.x) * zoomScale,        y: (destination.y) * zoomScale }
        } as SpaghettiPoints;
    
        return {
            origin: { x: 0, y: 0 },
            width:  nodeViewportDimensions.width,
            height: nodeViewportDimensions.height,
            points: points
        } as SpaghettiData;
    }
} 