import { Component, OnInit } from '@angular/core';
import { ToolComponent } from 'src/app/base/tool/tool.component';
import { Colors } from 'src/app/global/colors';
import { DatabaseService } from './service/database.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  colors: Colors;

  constructor(private databaseService: DatabaseService) {
    this.colors = new Colors();
  }

  ngOnInit(): void {
  }

  public createNewDatabase() {
    this.databaseService.createDatabase();
  }

}
