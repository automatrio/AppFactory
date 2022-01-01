import { ComponentRef, Injectable } from '@angular/core';
import { NodeComponent } from 'src/app/core/node/node.component';
import { INode } from 'src/app/common/interfaces/node';

export type Constructor<T> = new (...args: any[]) => T;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private nodes: ComponentRef<INode>[] = [];

  constructor() { }

  public getNodeTitleIndex<T>(node: Constructor<INode>) : string {
    const sameTypeNodes = this.nodes
      .filter(n => {
        console.log(n?.instance.data.name)
        return n instanceof node && n.data.name.slice(-4, -3) == '.'
      });

    if(sameTypeNodes.length == 0) {
      return ".001";
    }

    const existingTitles = sameTypeNodes
      .map(n => Number(n.instance.data.name.slice(-3)));

    const index = Math.max(...existingTitles) + 1;

    if(index < 10) {
      return ".00" + index;
    }
    else if(index < 100) {
      return ".0" + index;
    }
    else {
      return "." + index;
    }
  }

  public appendNewNode(node: ComponentRef<INode>) {
    this.nodes.push(node);
  }

  public getNode(node: INode) : ComponentRef<INode> | undefined {
    return this.nodes.find(n => n.instance === node);
  }

}
