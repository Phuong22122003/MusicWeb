import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageLogoutAndroidComponent } from './modules/homepage-signed-out/components/homepage-signed-out/homepage-logout-android/homepage-logout-android.component';

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
  {
    path:"logout",
    loadChildren:()=>import("./modules/homepage-signed-out/homepage-signed-out.module").then((m)=>m.HomepageSignedOutModule)
  },
  { path: 'logout/android', component: HomepageLogoutAndroidComponent },
  { path: '**', redirectTo: 'logout', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
