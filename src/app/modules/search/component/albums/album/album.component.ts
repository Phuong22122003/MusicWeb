import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { PlaylistComponent } from '../../playlists/playlist/playlist.component';
import { Playlist } from '../../../../../core/models/seach/playlist';
import { TrackInfoAndWaveComponent } from '../../../../../shared/components/track-info-and-wave/track-info-and-wave.component';
import { Track } from '../../../../../core/models/track';

@Component({
  selector: 'app-album',
  standalone: false,
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent {
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
