import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageLogoutAndroidComponent } from '../../modules/homepage-signed-out/components/homepage-signed-out/homepage-logout-android/homepage-logout-android.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children:[
      {
        path: 'home',
        loadChildren: () =>
          import('../../modules/visitor-home/visitor-home.module').then(
            (m) => m.VisitorHomeModule
          ),
      },
      {
        path:"discover",
        loadChildren:()=>import("../../modules/home/home.module").then((m)=>m.HomeModule)
      },
      {
        path:"logout",
        loadChildren:()=>import("../../modules/homepage-signed-out/homepage-signed-out.module").then((m)=>m.HomepageSignedOutModule)
      },
      {
        path:"library",
        loadChildren:()=>import("../../modules/library-page/library-page.module").then((m)=>m.LibraryPageModule)
      },
      {
        path:"search",
        loadChildren:()=>import("../../modules/search/search.module").then((m)=>m.SearchModule)
      },
      { path: 'logout/android', component: HomepageLogoutAndroidComponent },
      { path: '', redirectTo:'/home' ,pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
