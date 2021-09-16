import { Component, OnInit } from '@angular/core';
import { INode } from 'src/app/common/interfaces/node';
import { Property } from 'src/app/common/models/property';
import { DataService } from 'src/app/core/services/data.service';
import { Colors } from 'src/app/global/colors';
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
    new Property<Credentials>("Credentials", this.data, "credentials", true, this.colors.orange),
    new Property<Environment>("Environment", this.data, "environment", true, this.colors.green)
  ];

  constructor(private dataService: DataService) {
    this.data.name = "Database" + this.dataService.getNodeTitleIndex(DatabaseNodeComponent);
    this.dataService.appendNewNode(this);
  }

  ngOnInit(): void {
  }

}
