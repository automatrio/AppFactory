import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NodeComponent } from '../node/node.component';
import { SpaghettiComponent } from '../spaghetti/spaghetti.component';
import { SpaghettiService } from '../spaghetti/spaghetti.service';

@Component({
  selector: 'slot',
  templateUrl: './slot.component.html',
  styleUrls: [
    '../styles/bloom-box.scss',
    '../styles/bloom-box-interactable.scss',
    './slot.component.css'
  ]
})
export class SlotComponent implements OnInit, AfterViewInit {
  
  private _activeSlot: SlotComponent;

  @Input() parentNode: NodeComponent;
  @Input() boundSpaghetti: SpaghettiComponent;
  @Input() type: "input" | "output";

  @HostBinding("style.--color")
    @Input() color: string;

  @Output() slotClicked = new EventEmitter<SlotComponent>();

  @ViewChild('boxContainer') boxContainer!: ElementRef<HTMLDivElement>;

  constructor(
      private spaghettiService: SpaghettiService,
    ) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.spaghettiService.listenToMouseUpQueued$
      .subscribe(event => {
        this.onMouseUp(event);
      });
    this.spaghettiService.amountOfSlots++;
  }

  ////////// PUBLIC METHODS //////////

  public onMouseDown(event: MouseEvent) {
    if(this.isWithin(event)) {
      event.preventDefault();
      this._activeSlot = this;
      this.slotClicked.emit(this);
    }
  }

  ////////// PRIVATE METHODS //////////

  private isWithin(event: MouseEvent) {
    const rect = (this.boxContainer.nativeElement as HTMLElement).getBoundingClientRect();
    const isWithinX = event.x > rect.left && event.x < rect.right;
    const isWithinY = event.y > rect.top && event.y < rect.bottom;
    
    return (isWithinX && isWithinY);
  }

  private onMouseUp = (event: MouseEvent) => {
    if(!this.isWithin(event)) {
      this.spaghettiService.selectedSlot.next(null);
    } 
    else {
      if (this._activeSlot == this) {
      this.spaghettiService.selectedSlot.next(null);
      } 
      else {
        this.spaghettiService.selectedSlot.next(this);
      }
    }
  }

}
