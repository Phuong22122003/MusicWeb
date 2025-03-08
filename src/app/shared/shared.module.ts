import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SoundCardComponent } from './components/sound-card/sound-card.component';
import { RelatedTrackComponent } from './components/related-track/related-track.component';
import { WavesurferComponent } from './components/wavesurfer/wavesurfer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SoundCardComponent,
    RelatedTrackComponent,
    WavesurferComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    SoundCardComponent,
    RelatedTrackComponent,
    WavesurferComponent
  ]
})
export class SharedModule { }
