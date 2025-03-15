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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { CardComponent } from './components/card/card.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { RecommendedCardComponent } from './components/recommended-card/recommended-card.component';

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
    ArtistCardComponent,
    CardComponent,
    CardListComponent,
    RecommendedCardComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    HeaderComponent,
    AuthModalComponent,
    SoundCardComponent,
    RelatedTrackComponent,
    TrackCardComponent,
    SideBarComponent,
    WavesurferComponent,
    ArtistCardComponent,
    CardComponent,
    CardListComponent,
    RecommendedCardComponent
  ],
})
export class SharedModule {}
