import { TestBed } from "@angular/core/testing";
import { BookingService } from "./booking.service";

describe("BookingService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: BookingService = TestBed.get(BookingService);
    expect(service).toBeTruthy();
  });

  it("default event should be created", () => {
    const event1 = TestBed.get(BookingService).createDefaultEvent();
    expect(event1.start).not.toEqual(null);

    const start = new Date();
    const event2 = TestBed.get(BookingService).createDefaultEvent(start);
    expect(event2.start).toEqual(start);
  });

  it("Create correct titles", () => {
    const val = TestBed.get(BookingService).createTitle({
      title: "Test",
      start: new Date(),
      end: new Date()
    });
    expect(val).toContain("Test");
  });
});
