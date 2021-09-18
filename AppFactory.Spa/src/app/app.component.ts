import { HostBinding, HostListener, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AppFactory';

  constructor() {
  }

  ngOnInit() {
  }

}
