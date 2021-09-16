import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ExplorerGroupOfPropertiesHostDirective } from 'src/app/common/directives/explorer-group-of-properties-host.directive';
import { ExplorerService } from 'src/app/core/services/explorer.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements AfterViewInit {

  @ViewChild(ExplorerGroupOfPropertiesHostDirective, {static: true}) groupOfPropertiesHost!: ExplorerGroupOfPropertiesHostDirective;

  constructor(
      private scrollDispatcher: ScrollDispatcher,
      private explorerService: ExplorerService) {
    this.scrollDispatcher.scrolled().subscribe(x => console.log('I am scrolling'));
    
  }

  ngAfterViewInit(): void {
    this.explorerService.groupOfPropertiesHost = this.groupOfPropertiesHost.viewContainerRef;
  }

}
