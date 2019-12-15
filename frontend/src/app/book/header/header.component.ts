import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CalendarView } from "angular-calendar";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Input()
  view: CalendarView | "month" | "week" = "week";
  @Input()
  viewDate: Date;
  @Output()
  viewDateChange = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
