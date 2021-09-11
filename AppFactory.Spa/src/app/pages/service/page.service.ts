import { Injectable } from '@angular/core';
import { NodeViewportComponent } from 'src/app/base/node-viewport/node-viewport.component';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  viewportRef: NodeViewportComponent;

  constructor() { }
}
