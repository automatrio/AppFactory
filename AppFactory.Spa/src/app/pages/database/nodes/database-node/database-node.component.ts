import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NodeComponent } from 'src/app/base/node/node.component';
import { SpaghettiService } from 'src/app/base/spaghetti/spaghetti.service';
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
export class DatabaseNodeComponent extends NodeComponent implements OnInit {

  private database: Database = new Database();

  colors = new Colors();
  iconUrl: string = "../";
  title: string = "Database";
  properties: Property<any>[] = [
    new Property<string>("Database Name", this.database.name, "input"),
    new Property<Credentials>("Credentials", this.database.credentials, "input"),
    new Property<Environment>("Environment", this.database.environment, "input")
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
