import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistComponent } from './playlist/playlist.component';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
  {
    path:'playlist',
    component: PlaylistComponent
  },
  {
    path:'history',
    component: HistoryComponent
  },
  { path: '**', redirectTo: 'playlist', pathMatch: 'full' },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule { }
