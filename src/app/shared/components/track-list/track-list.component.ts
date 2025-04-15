import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TrackList } from '../../../core/models/tracklist';
import { TrackAndWave } from '../../../core/models/track_wave';
import { TrackInfoAndWaveComponent } from '../track-info-and-wave/track-info-and-wave.component';

@Component({
  selector: 'app-track-list',
  standalone: false,
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss'
})
export class TrackListComponent{
  @Input() tracklist!: TrackList;
  @ViewChild('trackInfoAndWaveComponent') trackInfoAndWave!:TrackInfoAndWaveComponent ;
  isPlaying = false;
  currentTrack:TrackAndWave = this.tracklist.tracks[0];

  togglePlay(isPlaying:boolean){
      this.isPlaying = isPlaying;
  }
  playNext(track:TrackAndWave){
    this.togglePlay(true);
    this.trackInfoAndWave.changeUrl(track.file_path);
    this.currentTrack = track;
  }
  stopPlay(){
    this.trackInfoAndWave.pause();
    this.isPlaying = false;
  }
}
