import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Command } from '../command';

@Component({
  selector: 'tool',
  templateUrl: './tool.component.html',
  styleUrls: ['../styles/bloom-box.scss', '../styles/bloom-box-interactable.scss']
})
export class Tool implements OnInit {

  @Input() title: string;
  @Input() command: Command;
  
  @HostBinding("style.--color")
    @Input() color: string;

  constructor() { }

  ngOnInit(): void {
  }

  executeCommand() {
    this.command.execute();
  }

}
