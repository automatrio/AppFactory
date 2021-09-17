import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ExplorerGroupOfPropertiesHostDirective } from 'src/app/common/directives/explorer-group-of-properties-host.directive';
import { ExplorerNavigatorIconsHostDirective } from 'src/app/common/directives/explorer-navigator-icons-host.directive';
import { ExplorerService } from 'src/app/core/services/explorer.service';
import { STAGGER_CHILDREN } from './animations/explorer-animations';
import { ExplorerNavigatorIconComponent } from './explorer-navigator-icon/explorer-navigator-icon.component';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css'],
  animations: STAGGER_CHILDREN
})
export class ExplorerComponent implements AfterViewInit {

  @ViewChild(ExplorerGroupOfPropertiesHostDirective, {static: true}) groupOfPropertiesHost!: ExplorerGroupOfPropertiesHostDirective;
  @ViewChild(ExplorerNavigatorIconsHostDirective, {static: true}) navigatorIconsHosts!: ExplorerNavigatorIconsHostDirective;

  constructor(
      private scrollDispatcher: ScrollDispatcher,
      public explorerService: ExplorerService) {
    this.scrollDispatcher.scrolled().subscribe(x => console.log('I am scrolling'));
    
  }

  ngAfterViewInit(): void {
    this.explorerService.groupOfPropertiesHost = this.groupOfPropertiesHost.viewContainerRef;
    this.explorerService.navigatorIconsHosts = this.navigatorIconsHosts.viewContainerRef;
  }

}
