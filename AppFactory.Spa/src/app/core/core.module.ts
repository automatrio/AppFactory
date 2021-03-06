import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../common/angular-material.module";
import { CommonSharedModule } from "../common/common-shared.module";
import { DirectivesModule } from "../common/directives/directives.module";
import { NodeProperty } from "./node-property/node-property.component";
import { NodeViewportComponent } from "./node-viewport/node-viewport.component";
import { NodeComponent } from "./node/node.component";
import { SlotComponent } from "./slot/slot.component";
import { SpaghettiComponent } from "./spaghetti/spaghetti.component";
import { ToolComponent } from "./tool/tool.component";


@NgModule({
  declarations: [
    ToolComponent,
    NodeComponent,
    NodeViewportComponent,
    NodeProperty,
    SlotComponent,
    SpaghettiComponent,
  ],
  imports: [
    CommonModule,
    CommonSharedModule,
    AngularMaterialModule,
    DirectivesModule,
    FormsModule
  ],
  exports: [
    ToolComponent,
    ToolComponent,
    NodeComponent,
    NodeProperty,
    NodeViewportComponent,
    SlotComponent,
    SpaghettiComponent,
  ]
})

export class CoreModule {}
