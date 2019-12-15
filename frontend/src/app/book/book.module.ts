import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";
import { CalendarModule } from "angular-calendar";
import { BookRoutingModule } from "./book-routing.module";
import { HeaderComponent } from "./header/header.component";
import { IformComponent } from "./iform/iform.component";
import { NowComponent } from "./now/now.component";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [NowComponent, IformComponent, HeaderComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CalendarModule
  ]
})
export class BookModule {}
