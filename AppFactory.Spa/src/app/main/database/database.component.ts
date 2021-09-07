import { Component, OnInit } from '@angular/core';
import { Tool } from 'src/app/base/tool/tool.component';
import { Colors } from 'src/app/global/colors';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  colors: Colors;

  constructor() {
    this.colors = new Colors();
  }

  ngOnInit(): void {
  }

}
