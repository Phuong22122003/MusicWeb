import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AllTabComponent } from './profile/panel-tab/all-tab/all-tab.component';
import { ListTabComponent } from './profile/panel-tab/list-tab/list-tab.component';
import { TrackTabComponent } from './profile/panel-tab/track-tab/track-tab.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'all', component: AllTabComponent },
      { path: 'albums', component: ListTabComponent },
      { path: 'playlists', component: ListTabComponent },
      { path: 'tracks', component: TrackTabComponent },
      {
        path: 'popular-tracks',
        component: TrackTabComponent,
      },
      { path: '**', redirectTo: 'all', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
