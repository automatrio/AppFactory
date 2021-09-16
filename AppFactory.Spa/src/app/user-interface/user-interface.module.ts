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
import { ExplorerPropertyComponent } from './explorer/explorer-property/explorer-property.component';
import { ExplorerGroupOfPropertiesComponent } from './explorer/explorer-group-of-properties/explorer-group-of-properties.component';
import { DirectivesModule } from '../common/directives/directives.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ExplorerComponent,
    NavbarComponent,
    PanelsOverlayComponent,
    OptionsMenuComponent,
    ExplorerHeaderComponent,
    ExplorerNavigatorIconComponent,
    ExplorerPropertyComponent,
    ExplorerGroupOfPropertiesComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AppRoutingModule,
    DirectivesModule,
    CoreModule,
    FormsModule
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
