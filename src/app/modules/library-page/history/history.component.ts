import { Component, OnInit } from '@angular/core';
import { TrackAndWave } from '../../../core/models/track_wave';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit{
  tracks:TrackAndWave[] = [];
  ngOnInit(): void {
      for(let i =0;i<10;i++){
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
        this.tracks.push(track);
      }
  }
}
