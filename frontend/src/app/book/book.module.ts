import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CalendarModule } from "angular-calendar";
import { BookRoutingModule } from "./book-routing.module";
import { NowComponent } from "./now/now.component";
import { IformComponent } from "./iform/iform.component";

@NgModule({
  declarations: [NowComponent, IformComponent],
  imports: [CommonModule, BookRoutingModule, HttpClientModule, CalendarModule]
})
export class BookModule {}
