import { Component, OnInit } from '@angular/core';
import { Track } from '../../../core/models/track';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  tracks: Track[] = [];
  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      const track: Track = {
        id: '1',
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
      this.tracks.push(track);
    }
  }
}
