import { Component, Input, OnInit } from '@angular/core';
import { HEADERS } from 'src/app/global/headers';

@Component({
    selector: 'app-explorer-header',
    template: `
        <section class="explorer-header">
            <img style="margin-right: 10px" [src]="currentUrl">
            {{headerTitle}}
        </section>
        <hr>
    `,
    styleUrls: ['../explorer.component.css']
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
