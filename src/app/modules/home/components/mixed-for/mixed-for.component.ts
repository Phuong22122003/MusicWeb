import { Component } from '@angular/core';
import { Track } from '../../../../core/models/track';

@Component({
  selector: 'app-mixed-for',
  standalone: false,
  templateUrl: './mixed-for.component.html',
  styleUrl: './mixed-for.component.scss'
})
export class MixedForComponent {
  tracks!:Track[];
  ngOnInit(): void {
    this.tracks = this.mockData();
  }
  mockData(){
    const mock_tracks:Track[] = [];
    for(let i =0;i<10;i++){
      const track :Track = {
        id:`${i}`,
        name:`Track${i}`,
        user_id:String(i),
        username:"user"+i,
        file_path:"./assets/audio/music.mp3",
        cover_image_path:"/assets/images/image.png",
        duration:'0:12',
        create_at:'01/01/2025',
      }
      mock_tracks.push(track);
    }
    return mock_tracks;
  }
}
