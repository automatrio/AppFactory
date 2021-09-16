import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NodeComponent } from 'src/app/base/node/node.component';
import { SpaghettiService } from 'src/app/base/spaghetti/spaghetti.service';
import { INode } from 'src/app/common/interfaces/node';
import { Property } from 'src/app/common/models/property';
import { DataService } from 'src/app/core/services/data.service';
import { Colors } from 'src/app/global/colors';
import { PageService } from 'src/app/pages/service/page.service';
import { Credentials } from '../../models/credentials';

@Component({
  selector: 'app-credentials-node',
  templateUrl: './credentials-node.component.html',
  styleUrls: ['./credentials-node.component.css']
})
export class CredentialsNodeComponent implements INode, OnInit {

  data: Credentials = {
    name: "",
    dataSource: "",
    userId: "",
    password: "",
    initialCatalog: "",
  } as Credentials;

  nodeType = "credentials";
  colors = new Colors();
  iconUrl: string = "../";
  title: string = "Credentials";
  properties: Property<any>[] = [
    new Property<string>("Data Source", this.data, "dataSource", false),
    new Property<string>("Initial Catalog", this.data, "initialCatalog", false),
    new Property<string>("User ID", this.data, "userId", false),
    new Property<string>("Password", this.data, "password", false),
  ];

  constructor(private dataService: DataService) {
    this.data.name = "Credentials" + this.dataService.getNodeTitleIndex(CredentialsNodeComponent);
    this.dataService.appendNewNode(this);
  }

  ngOnInit(): void {
  }

}
