import { Injectable } from "@angular/core";
import { CalendarEvent, CalendarEventTitleFormatter } from "angular-calendar";
import { UtilService } from "../service/util.service";
import { BookingService } from "./booking.service";

@Injectable()
export class EventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(private util: UtilService, private booking: BookingService) {
    super();
  }

  weekTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.weekTooltip(event, title);
    }
  }

  dayTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.dayTooltip(event, title);
    }
  }

  week(event: CalendarEvent): string {
    return this.booking.createTitle(event);
  }
}
