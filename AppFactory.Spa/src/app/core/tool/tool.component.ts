import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tool',
  templateUrl: './tool.component.html',
  styleUrls: ['../styles/bloom-box.scss', '../styles/bloom-box-interactable.scss']
})
export class ToolComponent implements OnInit {

  @Input() title: string;
  
  @HostBinding("style.--color")
    @Input() color: string;

  constructor() { }

  ngOnInit(): void {
  }

  executeCommand() {
  }

}
