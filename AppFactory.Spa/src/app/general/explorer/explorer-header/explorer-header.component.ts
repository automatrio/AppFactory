import { Component, Input, OnInit } from '@angular/core';
import { PROPERTIES } from 'src/app/global/properties';

@Component({
    selector: 'app-explorer-header',
    template: `
        <section class="explorer-header">
            <img style="margin-right: 10px" [src]="currentUrl">
            {{headerTitle}}
        </section>
        <hr>
    `,
    styles: [`
        .explorer-header {
            display: flex;
            align-items: center;
        }
        hr {
            border-color:rgba(132, 132, 132, 0.6);
        }
    `]
})
export class ExplorerHeaderComponent implements OnInit {
    
    currentUrl: string | undefined;
    
    @Input() headerTitle: string;
  
    constructor() { }
  
    ngOnInit(): void {
      const matchingInfo = PROPERTIES.find(el => el.headerTitle == this.headerTitle);
      this.currentUrl = matchingInfo?.iconURL;
  
      if(!this.currentUrl) {
        console.log("ExplorerHeader: headerTitle did not match any known property.");
      }
    }

}
