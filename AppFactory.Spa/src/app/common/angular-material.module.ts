import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    OverlayModule
  ],
  exports: [
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    OverlayModule
  ]
})
export class AngularMaterialModule { }
