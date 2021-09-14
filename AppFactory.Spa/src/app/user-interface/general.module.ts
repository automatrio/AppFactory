import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExplorerComponent } from './explorer/explorer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularMaterialModule } from '../common/angular-material.module';
import { PanelsOverlayComponent } from './panels-overlay/panels-overlay.component';
import { OptionsMenuComponent } from './options-menu/options-menu.component';
import { ExplorerNavigatorIconComponent } from './explorer/explorer-navigator-icon/explorer-navigator-icon.component';
import { ExplorerHeaderComponent } from './explorer/explorer-header/explorer-header.component';
import { AppRoutingModule } from '../app-routing.module';
import { CoreModule } from '../core/core.module';
import { BaseModule } from '../base/base.module';

@NgModule({
  declarations: [
    ExplorerComponent,
    NavbarComponent,
    PanelsOverlayComponent,
    OptionsMenuComponent,
    ExplorerHeaderComponent,
    ExplorerNavigatorIconComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AppRoutingModule,
    BaseModule,
    CoreModule
  ],
  providers: [
  ],
  exports: [
    ExplorerComponent,
    NavbarComponent,
    PanelsOverlayComponent
  ]
})
export class UserInterfaceModule { }
