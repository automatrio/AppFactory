import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { SpaghettiData } from 'src/app/common/interfaces/spaghetti-data';

@Component({
  selector: 'spaghetti',
  templateUrl: './spaghetti.component.html',
  styleUrls: ['./spaghetti.component.css']
})
export class SpaghettiComponent implements OnInit {

  @Input() data: SpaghettiData;

  @HostBinding("style.--top")
    @Input() top: string;

  @HostBinding("style.--left")
    @Input() left: string;
    
  constructor(public elementRef: ElementRef) { }

  ngOnInit(): void {
  }

}
