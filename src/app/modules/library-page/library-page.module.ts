import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { LikesComponent } from './likes/likes.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AlbumsComponent } from './albums/albums.component';
import { StationsComponent } from './stations/stations.component';
import { FollowingComponent } from './following/following.component';
import { HistoryComponent } from './history/history.component';



@NgModule({
  declarations: [
    OverviewComponent,
    LikesComponent,
    PlaylistComponent,
    AlbumsComponent,
    StationsComponent,
    FollowingComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LibraryPageModule { }
