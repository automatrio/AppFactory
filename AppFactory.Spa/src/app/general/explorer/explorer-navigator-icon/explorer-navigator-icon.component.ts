import { Component, Input, OnInit } from '@angular/core';
import { PROPERTIES } from 'src/app/global/properties';

@Component({
  selector: 'app-explorer-navigator-icon',
  template: `
    <div class="explorer-icon explorer-panel">
      <img [src]="currentUrl">
    </div>
  `,
  styles: [`
    .explorer-panel {
        background-color: rgba(51, 51, 51, 0.9);
        box-shadow: 0px 0px 2px 2px rgba(132, 132, 132, 0.2) inset;
    }
    .explorer-icon {
        margin-bottom: 2px;
    }
    .explorer-icon > img {
        padding: 6px;
    }`]
})
export class ExplorerNavigatorIconComponent implements OnInit {

  currentUrl: string | undefined;

  @Input() iconType: string;

  constructor() { }

  ngOnInit(): void {
    const matchingInfo = PROPERTIES.find(el => el.iconType == this.iconType);
    this.currentUrl = matchingInfo?.iconURL;

    if(!this.currentUrl) {
      console.log("ExplorerNavigatorIconComponent: iconType did not match any known icon.");
    }
  }
}
