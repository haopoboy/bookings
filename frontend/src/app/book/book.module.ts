import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule
} from "@angular/material";
import { CalendarModule } from "angular-calendar";
import { BookRoutingModule } from "./book-routing.module";
import { HeaderComponent } from "./header/header.component";
import { IformComponent } from "./iform/iform.component";
import { NowComponent } from "./now/now.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MatMomentDateModule } from "@angular/material-moment-adapter";

@NgModule({
  declarations: [
    NowComponent,
    IformComponent,
    HeaderComponent,
    SidebarComponent
  ],
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
    MatDividerModule,
    MatDatepickerModule,
    MatMomentDateModule,
    CalendarModule
  ]
})
export class BookModule {}
