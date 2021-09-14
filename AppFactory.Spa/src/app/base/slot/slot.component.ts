import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, Renderer2, RendererFactory2, ViewChild } from '@angular/core';
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
  private _renderer: Renderer2;
  private _unlistenMouseUp: () => void;

  @Input() boundSpaghetti: SpaghettiComponent;

  @HostBinding("style.--color")
    @Input() color: string;

  @Output() slotClicked = new EventEmitter<SlotComponent>();

  @ViewChild('boxContainer') boxContainer!: ElementRef<HTMLDivElement>;

  constructor(
      private spaghettiService: SpaghettiService,
      private renderer: RendererFactory2
    ) {
    this._renderer = this.renderer.createRenderer(null, null);
    this.spaghettiService.listenToMouseUpQueued$.subscribe(event => {
      this.onMouseUp(event);
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

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
