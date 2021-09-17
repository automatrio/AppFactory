import { ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Property } from 'src/app/common/models/property';
import { NodeComponent } from 'src/app/core/node/node.component';
import { ExplorerGroupOfPropertiesComponent } from 'src/app/user-interface/explorer/explorer-group-of-properties/explorer-group-of-properties.component';
import { ExplorerNavigatorIconComponent } from 'src/app/user-interface/explorer/explorer-navigator-icon/explorer-navigator-icon.component';
import { ExplorerPropertyComponent } from 'src/app/user-interface/explorer/explorer-property/explorer-property.component';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {

  groupOfPropertiesHost: ViewContainerRef;
  navigatorIconsHosts: ViewContainerRef;
  groupsDisplayed: { 
      group: ComponentRef<ExplorerGroupOfPropertiesComponent>,
      icon: ComponentRef<ExplorerNavigatorIconComponent>
    }[] = [];

  constructor(private resolver: ComponentFactoryResolver) { }

  public async explore(node: NodeComponent) {

    await this.cleanExistingGroups();

    const groups = ExplorerService.assignPropertiesToGroups(node);

    this.generateGroups(groups);
    
  }

  ////////// PRIVATE METHODS //////////

  private instantiate<T>(component: Type<T>, host: ViewContainerRef) {
    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef = host.createComponent<T>(factory); 

    return componentRef;
  }

  private async cleanExistingGroups() {
    const endOfAllAnimations: Promise<void>[] = [];

    const endOfAllDestructions = this.groupsDisplayed.map(groupAndIcon => {
      endOfAllAnimations.push(this.waitForIconAnimation(groupAndIcon.icon.instance.animationDone));
      return new Promise<void>(resolve => {
        groupAndIcon.group.destroy();
        groupAndIcon.icon.destroy();
        resolve();
      });
    });

    await Promise.all(endOfAllDestructions);
    await Promise.all(endOfAllAnimations);

    this.groupsDisplayed = [];
  }

  private waitForIconAnimation(animationDone$: BehaviorSubject<boolean>) {
    return new Promise<void>(resolve => {
      animationDone$.subscribe(done => {
        if(done)
          resolve();
      });
    })
  }

  private static assignPropertiesToGroups(node: NodeComponent) : {[name: string]: any[]} {
    
    var groups: {[name: string]: any[]} = {
      "Object Properties": [new Property("Name", node.data, "name")]
    };

    if(!node.properties) {
      return groups;
    }

    var properties = node.properties;

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

        if(prop.isBoundTo) {
          groups[prop.name].push(new Property("Name", prop.isBoundTo.data, "name"));
          prop.isBoundTo.properties?.forEach(boundProp => {
            groups[prop.name].push(boundProp);
          });
        } 
        else {
          groups[prop.name].push(prop);
        }
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
        groupRef.instance.properties.push(propRef.instance);
      });
      const iconRef = this.generateIcon(groupName);

      this.groupsDisplayed.push({ group: groupRef, icon: iconRef });
    });
  }

  private generateIcon(groupName: string) : ComponentRef<ExplorerNavigatorIconComponent> {
    const iconRef = this.instantiate(ExplorerNavigatorIconComponent, this.navigatorIconsHosts);
    iconRef.instance.iconType = groupName;
    return iconRef;
  }
}
