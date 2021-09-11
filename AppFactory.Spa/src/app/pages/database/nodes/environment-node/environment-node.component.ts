import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NodeComponent } from 'src/app/base/node/node.component';
import { SpaghettiService } from 'src/app/base/spaghetti/spaghetti.service';
import { Property } from 'src/app/common/models/property';
import { Colors } from 'src/app/global/colors';
import { PageService } from 'src/app/pages/service/page.service';
import { Environment } from '../../models/environment';

@Component({
  selector: 'app-environment-node',
  templateUrl: './environment-node.component.html',
  styleUrls: ['./environment-node.component.css']
})
export class EnvironmentNodeComponent extends NodeComponent implements OnInit {

  private environment: Environment = new Environment();

  colors = new Colors();
  iconUrl: string = "../";
  title: string = "Environment";
  properties: Property<any>[] = [
    new Property<string>("Name", this.environment.name, "output"),
  ];

  constructor(
    resolver: ComponentFactoryResolver,
    pageService: PageService,
    spaghettiService: SpaghettiService) {
    super(resolver, pageService, spaghettiService);
  }

  ngOnInit(): void {
  }


}
