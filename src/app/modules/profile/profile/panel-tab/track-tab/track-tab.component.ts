import { Component, OnInit } from '@angular/core';
import { Track } from '../../../../../core/models/track';
import { ActivatedRoute } from '@angular/router';
import { TrackAndWave } from '../../../../../core/models/track_wave';

@Component({
  selector: 'app-track-tab',
  standalone: false,
  templateUrl: './track-tab.component.html',
  styleUrl: './track-tab.component.scss',
})
export class TrackTabComponent implements OnInit {
  routePath = '';
  track:TrackAndWave = {
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
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    const routePath = this.route.snapshot.url[0]?.path;
    console.log(routePath);
  }
}
