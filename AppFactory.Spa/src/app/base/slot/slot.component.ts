import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SpaghettiService } from 'src/app/core/spaghetti/spaghetti.service';

@Component({
  selector: 'slot',
  templateUrl: './slot.component.html',
  styleUrls: [
    '../styles/bloom-box.scss',
    '../styles/bloom-box-interactable.scss',
    './slot.component.css'
  ]
})
export class Slot implements OnInit {

  @HostBinding("style.--color")
    @Input() color: string;

  @Output() slotClicked = new EventEmitter<Slot>();

  @ViewChild('boxContainer') boxContainer: ElementRef<HTMLDivElement>;

  constructor(private spaghettiService: SpaghettiService) { }

  ngOnInit(): void {
  }

  ////////// PUBLIC METHODS //////////

  public onMouseDown(event: MouseEvent) {
    if(this.isWithin(event)) {
      event.preventDefault();
      this.slotClicked.emit(this);
    }
  }

  public onMouseUp(event: MouseEvent) {
    if(this.isWithin(event)) {
      event.preventDefault();
      this.spaghettiService.selectedSlot.next(this);
    }
  }

  ////////// PRIVATE METHODS //////////

  private isWithin(event: MouseEvent) {
    const rect = (this.boxContainer.nativeElement as HTMLElement).getBoundingClientRect();
    const isWithinX = event.x > rect.left && event.x < rect.right;
    const isWithinY = event.y > rect.top && event.y < rect.bottom;
    
    return (isWithinX && isWithinY);
  }

}
