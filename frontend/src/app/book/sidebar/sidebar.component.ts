import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild
} from "@angular/core";
import { MatCalendar } from "@angular/material";
import { UtilService } from "src/app/service/util.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnChanges {
  @Input()
  viewDate;

  @Output()
  viewDateChange = new EventEmitter();

  @ViewChild(MatCalendar, { static: false })
  calendar: MatCalendar<any>;

  constructor(public util: UtilService) {}

  ngOnChanges() {
    if (this.calendar) {
      this.calendar._goToDateInView(this.util.asMoment(this.viewDate), "month");
    }
  }
}
