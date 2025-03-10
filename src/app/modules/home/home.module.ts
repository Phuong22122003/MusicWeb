import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RecentlyPlayedComponent } from './components/recently-played/recently-played.component';
import { SharedModule } from "../../shared/shared.module";
import { RecommendedPlaylistComponent } from './components/recommended-playlist/recommended-playlist.component';



@NgModule({
  declarations: [HomeComponent, RecentlyPlayedComponent, RecommendedPlaylistComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
]
})
export class HomeModule { }
