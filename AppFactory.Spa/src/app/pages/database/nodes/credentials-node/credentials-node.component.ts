import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NodeComponent } from 'src/app/base/node/node.component';
import { SpaghettiService } from 'src/app/base/spaghetti/spaghetti.service';
import { Property } from 'src/app/common/models/property';
import { Colors } from 'src/app/global/colors';
import { PageService } from 'src/app/pages/service/page.service';
import { Credentials } from '../../models/credentials';

@Component({
  selector: 'app-credentials-node',
  templateUrl: './credentials-node.component.html',
  styleUrls: ['./credentials-node.component.css']
})
export class CredentialsNodeComponent extends NodeComponent implements OnInit {

  private credentials: Credentials = new Credentials();

  colors = new Colors();
  iconUrl: string = "../";
  title: string = "Credentials";
  properties: Property<any>[] = [
    new Property<string>("Data Source", this.credentials.dataSource, "output"),
    new Property<string>("Initial Catalog", this.credentials.initialCatalog, "output"),
    new Property<string>("User ID", this.credentials.userId, "output"),
    new Property<string>("Password", this.credentials.password, "output"),
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
