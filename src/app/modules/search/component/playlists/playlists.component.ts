import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Track } from '../../../../core/models/track';
import { PlayList } from '../../../../core/models/playlist';
import { TrackInfoAndWaveComponent } from '../../../../shared/components/track-info-and-wave/track-info-and-wave.component';
import { Playlist } from '../../../../core/models/seach/playlist';
import { PlaylistComponent } from './playlist/playlist.component';

@Component({
  selector: 'app-playlists',
  standalone: false,
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss',
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  currentPlaylistComponent?: PlaylistComponent;
  play(playlistComponent: PlaylistComponent) {
    if (this.currentPlaylistComponent === null) {
      this.currentPlaylistComponent = playlistComponent;
    } else if (this.currentPlaylistComponent != playlistComponent) {
      this.currentPlaylistComponent?.stopPlay();
      this.currentPlaylistComponent = playlistComponent;
    }
  }
  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      const tracks = this.getMockTracks();
      const currentTrack = tracks[0];
      currentTrack.id = '123' + i;
      this.playlists.push({
        id: '123' + i,
        cover_image_path:
          'https://i1.sndcdn.com/artworks-L0HsMyzKHuyVgijn-GawcCA-t500x500.jpg',
        like: 100,
        tracks: tracks,
      });
    }
  }
  getMockTracks() {
    const tracks = [];
    for (let i = 0; i < 10; i++) {
      const track: Track = {
        id: '1' + i,
        name: 'My Song123123',
        title: 'Awesome Track',
        description: 'A great song to listen to',
        fileName: 'assets/audios/NhuNgayHomQua.mp3',
        coverImagePath:
          'https://i1.sndcdn.com/artworks-L0HsMyzKHuyVgijn-GawcCA-t500x500.jpg',
        userId: '123',
        duration: '03:45',
        createdAt: '2024-03-17T12:00:00Z',
        username: 'john_doe',
        played: 100,
        liked: 100,
        comment: 100,
      };
      tracks.push(track);
    }
    return tracks;
  }
}
