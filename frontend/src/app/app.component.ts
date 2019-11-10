import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, HostBinding } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Bookings";
  @HostBinding("class.theme-dark") themeDark = true;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}
}
