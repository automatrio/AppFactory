import { ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import { Property } from 'src/app/common/models/property';
import { NodeComponent } from 'src/app/core/node/node.component';
import { ExplorerGroupOfPropertiesComponent } from 'src/app/user-interface/explorer/explorer-group-of-properties/explorer-group-of-properties.component';
import { ExplorerPropertyComponent } from 'src/app/user-interface/explorer/explorer-property/explorer-property.component';
import { ExplorerComponent } from 'src/app/user-interface/explorer/explorer.component';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {

  groupOfPropertiesHost: ViewContainerRef;
  groupsDisplayed: ComponentRef<ExplorerGroupOfPropertiesComponent>[] = []; 

  constructor(private resolver: ComponentFactoryResolver) { }

  public explore(node: NodeComponent) {

    this.cleanExistingGroups();

    const groups = ExplorerService.assignPropertiesToGroups(node);

    this.generateGroups(groups);
    
  }

  ////////// PRIVATE METHODS //////////

  private instantiate<T>(component: Type<T>, host: ViewContainerRef) {
    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef = host.createComponent<T>(factory); 

    return componentRef;
  }

  private cleanExistingGroups() {
    this.groupsDisplayed.forEach(group => {
      group.destroy();
    });
    this.groupsDisplayed = [];
  }

  private static assignPropertiesToGroups(node: NodeComponent) : {[name: string]: any[]} {
    const properties = node.properties;
    var groups: {[name: string]: any[]} = {
      "Object Properties": [new Property("Name", node.data, "name")]
    };

    properties.forEach(prop => {
      const type = typeof(prop.nodeData[prop.binding]);
      if(type == "string" || type == "number" || type == "boolean") { // primitives
        if(!groups["Object Properties"]) {
          groups["Object Properties"] = [];
        }
        groups["Object Properties"].push(prop);
      }
      else { // complex types
        if(!groups[prop.name]) {
          groups[prop.name] = [];
        }
        groups[prop.name].push(prop);
      }
    });

    return groups;
  }

  private generateGroups(groups: {[name: string]: any[]}) {
    Object.keys(groups).forEach(groupName => {

      const groupRef = this.instantiate(ExplorerGroupOfPropertiesComponent, this.groupOfPropertiesHost);
      groupRef.instance.headerTitle = groupName;

      const propertyHost = groupRef.instance.propertyHost.viewContainerRef;

      groups[groupName].forEach(prop => {
        const propRef = this.instantiate(ExplorerPropertyComponent, propertyHost);
        propRef.instance.property = prop;
        
      });
      
      this.groupsDisplayed.push(groupRef);
    });
  }
}
