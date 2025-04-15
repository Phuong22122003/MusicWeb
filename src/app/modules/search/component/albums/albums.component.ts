import { Component } from '@angular/core';
import { Album } from '../../../../core/models/seach/album';
import { AlbumComponent } from './album/album.component';
import { Track } from '../../../../core/models/track';
import { TrackAndWave } from '../../../../core/models/track_wave';

@Component({
  selector: 'app-albums',
  standalone: false,
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss'
})
export class AlbumsComponent {
  albums: Album[] = [];
  currentAlbumComponent?: AlbumComponent;

  play(albumComponent: AlbumComponent) {
    if (!this.currentAlbumComponent) {
      this.currentAlbumComponent = albumComponent;
    } else if (this.currentAlbumComponent !== albumComponent) {
      this.currentAlbumComponent?.stopPlay();
      this.currentAlbumComponent = albumComponent;
    }
  }

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      const tracks = this.getMockTracks();
      const currentTrack = tracks[0];
      currentTrack.id = '123' + i;

      this.albums.push({
        id: '123' + i,
        cover_image_path: 'https://i1.sndcdn.com/artworks-L0HsMyzKHuyVgijn-GawcCA-t500x500.jpg',
        like: 100,
        tracks: tracks,
        release_date:"01/01/2025"
      });
    }
  }

  getMockTracks() {
    const tracks: TrackAndWave[] = [];
    for (let i = 0; i < 10; i++) {
      const track:TrackAndWave = {
        id: '1',
        name: 'My Song123123',
        file_path: 'assets/audios/NhuNgayHomQua.mp3',
        cover_image_path: 'https://i1.sndcdn.com/artworks-L0HsMyzKHuyVgijn-GawcCA-t500x500.jpg',
        user_id: '123',
        duration: '03:45',
        create_at: '2024-03-17T12:00:00Z',
        username: 'john_doe',
        played:100,
        liked:100,
        comment:100,
        tags:[
          {
            url:'/tag',
            name:'Pop'
          },
          {
            url:'/tag',
            name:'Childrens'
          },
          {
            url:'/tag',
            name:'Rap'
          },
        ]
      }
      tracks.push(track);
    }
    return tracks;
  }
}
