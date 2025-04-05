import { Component, OnInit } from '@angular/core';
import { Track } from '../../../../core/models/track';

@Component({
  selector: 'app-tracks',
  standalone: false,
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss'
})
export class TracksComponent implements OnInit{
  tracks:Track[] = [];
  ngOnInit(): void {
      for(let i =0;i<10;i++){
        const track:Track = {
          id: '1',
          name: 'My Song123123',
          title: 'Awesome Track',
          description: 'A great song to listen to',
          file_path: 'assets/audios/NhuNgayHomQua.mp3',
          cover_image_path: 'https://i1.sndcdn.com/artworks-L0HsMyzKHuyVgijn-GawcCA-t500x500.jpg',
          user_id: '123',
          duration: '03:45',
          create_at: '2024-03-17T12:00:00Z',
          username: 'john_doe',
          played:100,
          liked:100,
          comment:100
        }
        this.tracks.push(track);
      }
  }
}