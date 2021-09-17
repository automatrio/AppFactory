import { AnimationEvent } from '@angular/animations';
import { Component, HostBinding, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExplorerService } from 'src/app/core/services/explorer.service';
import { HEADERS } from 'src/app/global/headers';
import { CHILD_FADE_IN_AND_OUT } from '../animations/explorer-animations';

@Component({
  selector: 'app-explorer-navigator-icon',
  template: `
    <div 
      class="explorer-icon explorer-panel"
      @animate
      (@animate.done)="onAnimationDone($event)"
      (click)="onIconClicked()"
      >
      <img [src]="iconUrl">
    </div>
  `,
  styleUrls: ['../explorer.component.scss'],
  animations: CHILD_FADE_IN_AND_OUT
})
export class ExplorerNavigatorIconComponent implements OnInit {

  iconUrl: string | undefined;
  iconType: string;
  animationDone = new BehaviorSubject<boolean>(false);

  @HostBinding("style.--brightness") brightness: number = 1;

  constructor(private explorerService: ExplorerService) { }

  ngOnInit(): void {
    const matchingInfo = HEADERS.find(el => el.headerTitle == this.iconType);
    this.iconUrl = matchingInfo?.iconURL;

  if(!this.iconUrl) {
    console.log("ExplorerNavigatorIconComponent: iconType did not match any known icon.");
  }
  }

  public onAnimationDone(event: AnimationEvent) {
    if(event.toState == "void")
      this.animationDone.next(true);
    else
      this.animationDone.next(false);
  }

  public onIconClicked() {
    this.explorerService.navigateToGroup(this.iconType);
  }
}
