import { Injectable } from '@angular/core';
import { NodeViewportComponent } from 'src/app/core/node-viewport/node-viewport.component';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  viewportRef: NodeViewportComponent;

  constructor() { }
}
