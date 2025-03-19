import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SoundCardComponent } from './components/sound-card/sound-card.component';
import { RelatedTrackComponent } from './components/related-track/related-track.component';
import { WavesurferComponent } from './components/wavesurfer/wavesurfer.component';
import { TrackCardComponent } from './components/track-card/track-card.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { FormsModule } from '@angular/forms';

import { HeaderLogoutComponent } from './components/header-logout/header-logout.component';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { CardComponent } from './components/card/card.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { RecommendedCardComponent } from './components/recommended-card/recommended-card.component';
import { NextPlaylistComponent } from './components/next-playlist/next-playlist.component';
import { NextUpComponent } from './components/next-playlist/next-up/next-up.component';
import { NextUpItemComponent } from './components/next-playlist/next-up/next-up-item/next-up-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    HeaderComponent,
    SoundCardComponent,
    RelatedTrackComponent,
    WavesurferComponent,
    TrackCardComponent,
    SideBarComponent,
    UserCardComponent,
    AuthModalComponent,
    HeaderLogoutComponent,
    ArtistCardComponent,
    CardComponent,
    CardListComponent,
    RecommendedCardComponent,
    NextPlaylistComponent,
    NextUpComponent,
    NextUpItemComponent,
  ],
  imports: [CommonModule, FormsModule, DragDropModule],
  providers: [],
  exports: [
    HeaderComponent,
    AuthModalComponent,
    SoundCardComponent,
    RelatedTrackComponent,
    TrackCardComponent,
    SideBarComponent,
    WavesurferComponent,
    HeaderLogoutComponent,
    ArtistCardComponent,
    CardComponent,
    CardListComponent,
    RecommendedCardComponent,
    NextPlaylistComponent,
    NextUpItemComponent,
  ],
})
export class SharedModule {}
