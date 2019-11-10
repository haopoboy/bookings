import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Subject, Observable, of } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"]
})
export class InputComponent implements OnInit {
  searchTerm = "";
  input$ = new Subject<string>();
  options = ["Book now"];
  options$: Observable<string[]>;
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.options$ = of(this.options);
    this.input$
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(input => this.routing(input));
  }

  routing(term: string) {
    const fitleredTerm = term ? term.trim() : "";

    if ("Book now" === fitleredTerm) {
      this.router.navigate(["book/now"]);
    } else if (fitleredTerm) {
      this.router.navigate(["search", fitleredTerm]);
    }
  }

  onSearchChange(event: string) {
    if (event) {
      this.input$.next(event);
      this.options$ = of(
        this.options.filter(option =>
          option.toLowerCase().includes(event.toLocaleLowerCase())
        )
      );
    } else {
      this.options$ = of(this.options);
    }
  }
}
