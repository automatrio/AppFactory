import { Component, OnInit, ViewChild } from '@angular/core';
import { NodeViewportComponent } from 'src/app/core/node-viewport/node-viewport.component';
import { ToolComponent } from 'src/app/core/tool/tool.component';
import { Colors } from 'src/app/global/colors';
import { PageService } from '../service/page.service';
import { DatabaseService } from './service/database.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css', '../styles/pages.scss']
})
export class DatabaseComponent implements OnInit {

  colors = new Colors();

  @ViewChild(NodeViewportComponent, {static: true}) nodeViewportRef!: NodeViewportComponent;

  constructor(
    private pageService: PageService,
    private databaseService: DatabaseService
    ) {
  }

  ngOnInit(): void {
    this.pageService.viewportRef = this.nodeViewportRef;
  }

  // public createNewContext() {
  //   this.databaseService.createContext();
  // }
  public createNewCredentials() {
    this.databaseService.createCredentials();
  }

  public createNewDatabase() {
    this.databaseService.createDatabase();
  }

  public createNewEnvironment() {
    this.databaseService.createEnvironment();
  }



}
