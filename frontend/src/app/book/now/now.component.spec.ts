import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AppModule } from "src/app/app.module";
import { NowComponent } from "./now.component";

describe("NowComponent", () => {
  let component: NowComponent;
  let fixture: ComponentFixture<NowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // Fix provider of CalendarModule by ipmorting AppModule
      imports: [AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
