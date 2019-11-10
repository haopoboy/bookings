import { TestBed } from "@angular/core/testing";
import { InMemoryDbServiceImpl } from "./in-memory-db.service";

describe("InMemoryDbServiceImplService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: InMemoryDbServiceImpl = TestBed.get(InMemoryDbServiceImpl);
    expect(service).toBeTruthy();
  });
});
