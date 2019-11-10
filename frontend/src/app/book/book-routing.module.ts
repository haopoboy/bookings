import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NowComponent } from "./now/now.component";

const routes: Routes = [
  {
    path: "book",
    children: [{ path: "now", component: NowComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {}
