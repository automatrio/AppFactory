import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NodeProperty } from 'src/app/base/node-property/node-property.component';
import { NodeComponent } from 'src/app/base/node/node.component';
import { SpaghettiService } from 'src/app/base/spaghetti/spaghetti.service';
import { Property } from 'src/app/common/models/property';
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

  override _iconUrl: string = "../";
  override _color: string = "rgb(78, 144, 230)";
  override _title: string = "Database";
  override _properties: Property<any>[] = [
    new Property<string>("Database Name", this.database.name),
    new Property<Credentials>("Credentials", this.database.credentials),
    new Property<Environment>("Environment", this.database.environment)
  ];

  constructor(
    resolver: ComponentFactoryResolver,
    spaghettiService: SpaghettiService) {
    super(resolver, spaghettiService);
  }

  ngOnInit(): void {
  }

}
