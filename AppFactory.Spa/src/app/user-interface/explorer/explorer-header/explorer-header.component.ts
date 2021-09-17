import { Component, Input, OnInit } from '@angular/core';
import { HEADERS } from 'src/app/global/headers';
import { CHILD_FADE_IN_AND_OUT } from '../animations/explorer-animations';

@Component({
    selector: 'app-explorer-header',
    template: `
        <section class="explorer-header" @animate>
            <img style="margin-right: 10px" [src]="currentUrl">
            {{headerTitle}}
        </section>
    `,
    styleUrls: ['../explorer.component.css'],
    animations: CHILD_FADE_IN_AND_OUT
})
export class ExplorerHeaderComponent implements OnInit {
    
    currentUrl: string | undefined;
    
    @Input() headerTitle: string;
  
    constructor() { }
  
    ngOnInit(): void {
      const matchingInfo = HEADERS.find(el => el.headerTitle == this.headerTitle);
      this.currentUrl = matchingInfo?.iconURL;
  
      if(!this.currentUrl) {
        console.log("ExplorerHeader: headerTitle did not match any known property.");
      }
    }

}
