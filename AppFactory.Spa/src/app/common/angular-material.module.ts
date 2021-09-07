import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { OverlayModule } from '@angular/cdk/overlay';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    OverlayModule,
    DragDropModule
  ],
  exports: [
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    OverlayModule,
    DragDropModule
  ]
})
export class AngularMaterialModule { }
