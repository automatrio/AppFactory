import { Component, Input, OnInit } from '@angular/core';
import { HEADERS } from 'src/app/global/headers';

@Component({
  selector: 'app-explorer-navigator-icon',
  template: `
    <div class="explorer-icon explorer-panel">
      <img [src]="currentUrl">
    </div>
  `,
  styleUrls: ['../explorer.component.css']
})
export class ExplorerNavigatorIconComponent implements OnInit {

  currentUrl: string | undefined;

  @Input() iconType: string;

  constructor() { }

  ngOnInit(): void {
    const matchingInfo = HEADERS.find(el => el.iconType == this.iconType);
    this.currentUrl = matchingInfo?.iconURL;

    if(!this.currentUrl) {
      console.log("ExplorerNavigatorIconComponent: iconType did not match any known icon.");
    }
  }
}
