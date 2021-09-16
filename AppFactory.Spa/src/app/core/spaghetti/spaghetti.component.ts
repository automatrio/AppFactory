import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Point } from 'src/app/common/interfaces/point';
import { SpaghettiData } from 'src/app/common/interfaces/spaghetti-data';
import { SlotComponent } from '../slot/slot.component';
import { SVG_PADDING } from '../services/spaghetti.service';

@Component({
  selector: 'spaghetti',
  templateUrl: './spaghetti.component.html',
  styleUrls: ['./spaghetti.component.css']
})
export class SpaghettiComponent implements OnInit {

  inputSlot: SlotComponent;
  outputSlot: SlotComponent;

  data: SpaghettiData;
  svgPoints: string;
  glow: number = 2;

  @HostBinding("style.--top")
    top: string;

  @HostBinding("style.--left")
    left: string;
    
  @Input() binding$: Observable<SpaghettiData>;

  constructor(public elementRef: ElementRef) {}

  ngOnInit(): void {
    const el = (this.elementRef.nativeElement as HTMLElement);
    el.animate([{
      opacity: 0
    }, {
      opacity: 1
    }], 300).finished.then(() => {
      el.style.opacity = "1";
    });

    const inConstruction = this.binding$.subscribe(data => {
      this.data = data;
      this.top = data.origin.y - SVG_PADDING + "px";
      this.left = data.origin.x - SVG_PADDING + "px";
      this.svgPoints = Point.CreateSVGArray(data.points)
    });
  }
}
