import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./modules/example/example.module').then((m) => m.ExampleModule),
  // },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/visitor-home/visitor-home.module').then(
        (m) => m.VisitorHomeModule
      ),
  },
  { path: '**', redirectTo: 'example-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
