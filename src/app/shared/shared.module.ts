import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SoundCardComponent } from './components/sound-card/sound-card.component';
import { RelatedTrackComponent } from './components/related-track/related-track.component';
import { WavesurferComponent } from './components/wavesurfer/wavesurfer.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HeaderComponent,
    SoundCardComponent,
    RelatedTrackComponent,
    WavesurferComponent,
    AuthModalComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    HeaderComponent,
    AuthModalComponent,
    SoundCardComponent,
    RelatedTrackComponent,
    WavesurferComponent,
  ],
})
export class SharedModule {}
