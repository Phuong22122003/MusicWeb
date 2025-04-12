import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Playlist } from '../../../../../core/models/seach/playlist';
import { Track } from '../../../../../core/models/track';
import { TrackInfoAndWaveComponent } from '../../../../../shared/components/track-info-and-wave/track-info-and-wave.component';

@Component({
  selector: 'app-playlist',
  standalone: false,
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent implements OnInit {
  @Input() playlist!: Playlist;
  @Output() play = new EventEmitter<PlaylistComponent>();
  currentTrack!: Track;
  isPlaying = false;

  @ViewChild('trackComponent') trackInfoAndWave!: TrackInfoAndWaveComponent;
  ngOnInit(): void {
    this.currentTrack = this.playlist.tracks[0];
  }
  togglePlay(isPlaying: boolean) {
    this.isPlaying = isPlaying;
    this.play.emit(this);
  }
  playNext(track: Track) {
    this.togglePlay(true);
    this.trackInfoAndWave.changeUrl(track.fileName);
    this.currentTrack = track;
  }
  stopPlay() {
    this.trackInfoAndWave.pause();
    this.isPlaying = false;
  }
}
