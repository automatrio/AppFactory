import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/common/models/property';

@Component({
  selector: 'app-explorer-property',
  template: `
    <mat-form-field color="primary" class="example-full-width" appearance="fill">
      <mat-label>{{property.name}}</mat-label>
      <input matInput placeholder="Ex. Value" [(ngModel)]="property.nodeData[property.binding]">
    </mat-form-field>`,
  styleUrls: ['../explorer.component.css']
})
export class ExplorerPropertyComponent implements OnInit {

  property: Property<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
