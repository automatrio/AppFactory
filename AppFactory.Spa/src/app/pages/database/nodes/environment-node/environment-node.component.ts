import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NodeComponent } from 'src/app/base/node/node.component';
import { SpaghettiService } from 'src/app/base/spaghetti/spaghetti.service';
import { INode } from 'src/app/common/interfaces/node';
import { Property } from 'src/app/common/models/property';
import { DataService } from 'src/app/core/services/data.service';
import { Colors } from 'src/app/global/colors';
import { PageService } from 'src/app/pages/service/page.service';
import { Environment } from '../../models/environment';

@Component({
  selector: 'app-environment-node',
  templateUrl: './environment-node.component.html',
  styleUrls: ['./environment-node.component.css']
})
export class EnvironmentNodeComponent implements INode, OnInit {

  data: Environment = {
    name: ""
  } as Environment;

  nodeType = "environment";
  colors = new Colors();
  iconUrl: string = "../";
  title: string = "Environment";

  constructor(private dataService: DataService) {
    this.data.name = "Environment" + this.dataService.getNodeTitleIndex(EnvironmentNodeComponent);
    this.dataService.appendNewNode(this);
  }

  ngOnInit(): void {
  }

}
