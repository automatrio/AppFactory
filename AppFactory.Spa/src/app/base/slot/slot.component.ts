import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, RendererFactory2, ViewChild } from '@angular/core';
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
export class SlotComponent implements OnInit {

  private _activeSlot: SlotComponent;
  private _renderer;
  private _unlistenMouseUp: () => void;

  @Input() boundSpaghetti: SpaghettiComponent;

  @HostBinding("style.--color")
    @Input() color: string;

  @Output() slotClicked = new EventEmitter<SlotComponent>();

  @ViewChild('boxContainer') boxContainer: ElementRef<HTMLDivElement>;

  constructor(
    private spaghettiService: SpaghettiService,
    rendererFactory: RendererFactory2
    ) {
      this._renderer = rendererFactory.createRenderer(null, null);
    }

  ngOnInit(): void {
  }

  ////////// PUBLIC METHODS //////////

  public onMouseDown(event: MouseEvent) {
    if(this.isWithin(event)) {
      const viewport = this.spaghettiService.viewportRef.container.nativeElement;
      event.preventDefault();
      this._activeSlot = this;
      this.slotClicked.emit(this);
    }
  }

  public onMouseUp (event: MouseEvent) {
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

  ////////// PRIVATE METHODS //////////

  private isWithin(event: MouseEvent) {
    const rect = (this.boxContainer.nativeElement as HTMLElement).getBoundingClientRect();
    const isWithinX = event.x > rect.left && event.x < rect.right;
    const isWithinY = event.y > rect.top && event.y < rect.bottom;
    
    return (isWithinX && isWithinY);
  }

}
