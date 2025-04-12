import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth-guard';
import { MainComponent } from './layouts/main/main.component';
import { HomepageLogoutAndroidComponent } from './modules/homepage-signed-out/components/homepage-signed-out/homepage-logout-android/homepage-logout-android.component';
import { MainModule } from './layouts/main/main.module';
import { NoHeaderComponent } from './layouts/no-header/no-header.component';
import { SocialLoginComponent } from './shared/components/social-login/social-login.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'discover',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'logout',
        loadChildren: () =>
          import(
            './modules/homepage-signed-out/homepage-signed-out.module'
          ).then((m) => m.HomepageSignedOutModule),
      },
      {
        path: 'library',
        loadChildren: () =>
          import('./modules/library-page/library-page.module').then(
            (m) => m.LibraryPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./modules/search/search.module').then((m) => m.SearchModule),
      },

      {
        path: 'profile/:userId',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
        canActivate: [],
      },
      {
        path: 'song/:trackId',
        loadChildren: () =>
          import('./modules/play-music/play-music.module').then(
            (m) => m.PlayMusicModule
          ),
        canActivate: [],
      },
      { path: 'logout/android', component: HomepageLogoutAndroidComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: NoHeaderComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/visitor-home/visitor-home.module').then(
            (m) => m.VisitorHomeModule
          ),
      },
      {
        path: 'upload',
        loadChildren: () =>
          import('./modules/upload/upload.module').then((m) => m.UploadModule),
        canActivate: [],
      },
      {
        path: 'auth/success',
        component: SocialLoginComponent,
      },
    ],
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./layouts/errors/errors.module').then((m) => m.ErrorsModule),
  },

  { path: '**', redirectTo: 'error/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
