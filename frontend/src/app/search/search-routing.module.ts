import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InputComponent } from "./input/input.component";
import { MainComponent } from "./main/main.component";
import { TipsComponent } from "./tips/tips.component";

const routes: Routes = [
  { path: "", outlet: "searchInput", component: InputComponent },
  {
    path: "search",
    children: [
      {
        path: "",
        component: TipsComponent
      },
      {
        path: ":q",
        component: MainComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {}
