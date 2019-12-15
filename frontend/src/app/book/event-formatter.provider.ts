import { Injectable } from "@angular/core";
import { CalendarEvent, CalendarEventTitleFormatter } from "angular-calendar";
import { UtilService } from "../service/util.service";

@Injectable()
export class EventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(private util: UtilService) {
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
    return `${event.title}<br/>
    ${this.util.asMoment(event.start).format("h:mm")}
    - ${this.util.asMoment(event.end).format("LT")}
    `;
  }
}
