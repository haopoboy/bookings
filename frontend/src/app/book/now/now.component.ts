import { HttpClient } from "@angular/common/http";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {
  CalendarEventTitleFormatter,
  CalendarWeekViewComponent
} from "angular-calendar";
import { CalendarEvent, DayViewHourSegment } from "calendar-utils";
import { fromEvent, Subject } from "rxjs";
import { finalize, takeUntil } from "rxjs/operators";
import { UtilService } from "src/app/service/util.service";
import { BookingService } from "../booking.service";
import { EventTitleFormatter } from "../event-formatter.provider";

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Component({
  selector: "app-now",
  templateUrl: "./now.component.html",
  styleUrls: ["./now.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: EventTitleFormatter
    }
  ]
})
export class NowComponent implements OnInit {
  option = {
    dayStartHour: 8
  };
  viewDate = new Date();
  events: CalendarEvent[] = [];
  refresh = new Subject();

  @ViewChild("weekView", { static: false })
  weekView: CalendarWeekViewComponent;

  constructor(
    http: HttpClient,
    private cdr: ChangeDetectorRef,
    public util: UtilService,
    private booking: BookingService
  ) {
    http.get("/api/people").subscribe(page => {
      console.log(page);
    });
  }

  ngOnInit() {}

  dragToCreate(
    segment: DayViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    const dragToSelectEvent = this.createDefaultEvent(segment);
    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();

    fromEvent(document, "mousemove")
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.refreshEvents();
        }),
        takeUntil(fromEvent(document, "mouseup"))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = this.util
          .asMoment(segment.date)
          .add(minutesDiff, "minutes")
          .add(daysDiff, "days")
          .toDate();

        if (
          this.booking.conflicts(
            this.events,
            dragToSelectEvent,
            dragToSelectEvent.start,
            newEnd
          )
        ) {
          return;
        } else if (newEnd > segment.date) {
          dragToSelectEvent.end = newEnd;
        } else if (newEnd <= segment.date) {
          dragToSelectEvent.start = newEnd;
        }
        this.refreshEvents();
      });
  }

  createDefaultEvent(segment: DayViewHourSegment): CalendarEvent {
    const event = this.booking.createDefaultEvent(segment.date);
    event.id = this.events.length;
    return event;
  }

  eventTimesChanged({ event, newStart, newEnd }) {
    if (this.booking.conflicts(this.events, event, newStart, newEnd)) {
      return;
    }
    event.start = newStart;
    event.end = newEnd;
    this.refreshEvents();
  }

  refreshEvents() {
    // Force to emit rendering events
    this.events = [...this.events].map(v => {
      v.title = `${v.title} `;
      return v;
    });
    this.cdr.detectChanges();
  }
}
