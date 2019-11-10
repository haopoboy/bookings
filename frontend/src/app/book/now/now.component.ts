import { HttpClient } from "@angular/common/http";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from "@angular/core";
import { CalendarEventTitleFormatter } from "angular-calendar";
import { CalendarEvent, DayViewHourSegment } from "calendar-utils";
import { fromEvent } from "rxjs";
import { finalize, takeUntil } from "rxjs/operators";
import { UtilService } from "src/app/service/util.service";

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
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
}

@Component({
  selector: "app-now",
  templateUrl: "./now.component.html",
  styleUrls: ["./now.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})
export class NowComponent implements OnInit {
  option = {
    dayStartHour: 8
  };
  viewDate = new Date();
  events: CalendarEvent[] = [];

  constructor(
    http: HttpClient,
    private cdr: ChangeDetectorRef,
    public util: UtilService
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
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: "New event",
      start: segment.date,
      meta: {
        tmpEvent: true
      }
    };
    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();

    fromEvent(document, "mousemove")
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.refresh();
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

        if (newEnd > segment.date) {
          dragToSelectEvent.end = newEnd;
        }
        this.refresh();
      });
  }

  refresh() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }
}
