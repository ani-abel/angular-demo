import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { ViewSingleComponent } from './view-single/view-single.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "view" },
  { path: "view", component: ViewComponent },
  { path: "add", component: AddComponent },
  { path: "view-single/:id", component: ViewSingleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
