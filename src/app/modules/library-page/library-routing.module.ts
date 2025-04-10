import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistComponent } from './playlist/playlist.component';
import { HistoryComponent } from './history/history.component';
import { FollowingComponent } from './following/following.component';
import { AlbumsComponent } from './albums/albums.component';

const routes: Routes = [
  {
    path: 'playlist',
    component: PlaylistComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'following',
    component: FollowingComponent,
  },
  {
    path: 'albums',
    component: AlbumsComponent,
  },
  { path: '**', redirectTo: 'playlist', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}
