import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SoundCardComponent } from './components/sound-card/sound-card.component';
import { RelatedTrackComponent } from './components/related-track/related-track.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SoundCardComponent,
    RelatedTrackComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    SoundCardComponent,
    RelatedTrackComponent
  ]
})
export class SharedModule { }
