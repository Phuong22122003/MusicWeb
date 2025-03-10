import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/visitor-home/visitor-home.module').then(
        (m) => m.VisitorHomeModule
      ),
  },
  {
    path:"discover",
    loadChildren:()=>import("./modules/home/home.module").then((m)=>m.HomeModule)
  },
  { path: '**', redirectTo: 'discover', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
