import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';
import { CdkScrollable, CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, ElementRef, HostListener, Input, NgZone, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ExplorerGroupOfPropertiesHostDirective } from 'src/app/common/directives/explorer-group-of-properties-host.directive';
import { ExplorerNavigatorIconsHostDirective } from 'src/app/common/directives/explorer-navigator-icons-host.directive';
import { ExplorerService } from 'src/app/core/services/explorer.service';
import { STAGGER_CHILDREN } from './animations/explorer-animations';
import { ExplorerNavigatorIconComponent } from './explorer-navigator-icon/explorer-navigator-icon.component';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
  animations: STAGGER_CHILDREN
})
export class ExplorerComponent implements AfterViewInit {

  private _navigationHeight: number;

  @ViewChild(ExplorerGroupOfPropertiesHostDirective, {static: true}) 
    private groupOfPropertiesHost!: ExplorerGroupOfPropertiesHostDirective;
  @ViewChild(ExplorerNavigatorIconsHostDirective, {static: true}) 
    private navigatorIconsHosts!: ExplorerNavigatorIconsHostDirective;
  @ViewChild(CdkScrollable) 
    private scrollable!: CdkScrollable;
  @ViewChild("explorerContainer")
    private navigation: ElementRef<HTMLElement>;

  constructor(
      private scrollDispatcher: ScrollDispatcher,
      public explorerService: ExplorerService,
      private ngZone: NgZone) {
    this.scrollDispatcher
    .scrolled()
    .subscribe(() => {
      this.ngZone.run(() => this.explorerService.highlightIcons())
    });
  }

  ngAfterViewInit(): void {
    this.explorerService.groupOfPropertiesHost = this.groupOfPropertiesHost.viewContainerRef;
    this.explorerService.navigatorIconsHosts = this.navigatorIconsHosts.viewContainerRef;
    this.explorerService.scrollable = this.scrollable;
    this.explorerService.navigation = this.navigation.nativeElement;
  }
}
