import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  constructor(private scrollDispatcher: ScrollDispatcher) {
    this.scrollDispatcher.scrolled().subscribe(x => console.log('I am scrolling'));
  }

  ngOnInit(): void {
  }

}
