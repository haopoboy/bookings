import { Injectable } from "@angular/core";
import { CalendarEvent } from "calendar-utils";
import { UtilService } from "../service/util.service";

@Injectable({
  providedIn: "root"
})
export class BookingService {
  constructor(private util: UtilService) {}

  conflicts(
    events: CalendarEvent[],
    current: CalendarEvent,
    newStart: Date,
    newEnd: Date
  ) {
    const newStartMoment = this.util.asMoment(newStart);
    const newEndMoment = this.util.asMoment(newEnd);
    return (
      events
        .filter(e => current !== e)
        .filter(
          e =>
            newStartMoment.isSame(e.start) ||
            newEndMoment.isSame(e.end) ||
            newStartMoment.isBetween(e.start, e.end) ||
            newEndMoment.isBetween(e.start, e.end) ||
            this.util.asMoment(e.start).isBetween(newStart, newEnd) ||
            this.util.asMoment(e.end).isBetween(newStart, newEnd)
        ).length > 0
    );
  }

  createDefaultEvent(start = new Date(), template: any = {}): CalendarEvent {
    const event = {
      title: "New event",
      start,
      meta: {
        tmpEvent: true
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    };
    return Object.assign(event, template);
  }

  createTitle(event: CalendarEvent): string {
    const startMoment = this.util.asMoment(event.start);
    let start = null;
    if (startMoment.minutes() === 0) {
      start = startMoment.format("h");
    } else {
      start = startMoment.format("h:mm");
    }

    const endMoment = this.util.asMoment(event.end);
    let end = null;
    if (endMoment.minutes() === 0) {
      end = endMoment.format("h A");
    } else {
      end = endMoment.format("LT");
    }

    return `${event.title}<br/>${start} - ${end}`;
  }
}
