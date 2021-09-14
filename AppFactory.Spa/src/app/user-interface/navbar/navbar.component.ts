import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SECTIONS } from 'src/app/global/sections';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @HostListener('document:keypress', ['$event'])
  invokeShortcut(event: KeyboardEvent) { 
    // const keyPressed = event.key;
    // const activeSection = this.sections.find(section => keyPressed == section.shortcut);
    // if(activeSection) 
    //   this.navigate(activeSection.route);
  }

  sections = SECTIONS;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public navigate(route: string) {
    this.router.navigateByUrl(route);
  }

}
