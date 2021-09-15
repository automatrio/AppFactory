import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NodeComponent } from 'src/app/base/node/node.component';
import { SpaghettiService } from 'src/app/base/spaghetti/spaghetti.service';
import { INode } from 'src/app/common/interfaces/node';
import { Property } from 'src/app/common/models/property';
import { Colors } from 'src/app/global/colors';
import { PageService } from 'src/app/pages/service/page.service';
import { Credentials } from '../../models/credentials';
import { Database } from '../../models/database';
import { Environment } from '../../models/environment';

@Component({
  selector: 'app-database-node',
  templateUrl: './database-node.component.html',
  styleUrls: ['./database-node.component.css']
})
export class DatabaseNodeComponent implements INode, OnInit {

  data: Database = {
    name: "Database",
    credentials: new Credentials(),
    environment: new Environment()
  } as Database;
  nodeType = "database";

  colors = new Colors();
  iconUrl: string = "../";
  title: string = "Database";
  properties: Property<any>[] = [
    new Property<string>("Database Name", this.data.name, false),
    new Property<Credentials>("Credentials", this.data.credentials, true, this.colors.orange),
    new Property<Environment>("Environment", this.data.environment, true, this.colors.green)
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
