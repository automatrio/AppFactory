import { Component, Input, OnInit } from '@angular/core';
import { Command } from '../command';

@Component({
  selector: 'tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class Tool implements OnInit {

  @Input() title: string;
  @Input() command: Command;
  @Input() color: string;

  constructor() { }

  ngOnInit(): void {
  }

  executeCommand() {
    this.command.execute();
  }

  highlight(event: Event) {
    const element = event.currentTarget as HTMLElement;
    element.animate([{
      boxShadow: ""
    },{

    }])
  }

}
