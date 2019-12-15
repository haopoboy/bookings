import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-iform",
  templateUrl: "./iform.component.html",
  styleUrls: ["./iform.component.css"]
})
export class IformComponent implements OnInit {
  @Input()
  data: any = {};

  constructor() {}

  ngOnInit() {}
}
