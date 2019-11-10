import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from "@angular/material";
import { InputComponent } from "./input/input.component";
import { MainComponent } from "./main/main.component";
import { SearchRoutingModule } from "./search-routing.module";
import { TipsComponent } from "./tips/tips.component";

@NgModule({
  declarations: [InputComponent, MainComponent, TipsComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FlexLayoutModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule
  ]
})
export class SearchModule {}
