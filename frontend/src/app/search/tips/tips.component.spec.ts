import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SearchModule } from "../search.module";
import { TipsComponent } from "./tips.component";

describe("TipsComponent", () => {
  let component: TipsComponent;
  let fixture: ComponentFixture<TipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SearchModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
