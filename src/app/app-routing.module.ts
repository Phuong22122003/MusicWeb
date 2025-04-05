import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    loadChildren:()=>import("./layouts/main/main.module").then((m)=>m.MainModule)
  },
  {
    path:"error",
    loadChildren:()=>import("./layouts/errors/errors.module").then((m)=>m.ErrorsModule)
  },

  { path: '**', redirectTo: 'error/404', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
