import { Injectable } from '@angular/core';
import { NodeComponent } from 'src/app/base/node/node.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  nodes: NodeComponent[] = [];

  constructor() { }


}
