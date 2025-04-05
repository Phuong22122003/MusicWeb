import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Track } from '../../../../core/models/track';

@Component({
  selector: 'app-recently-played',
  standalone: false,
  templateUrl: './recently-played.component.html',
  styleUrl: './recently-played.component.scss'
})
export class RecentlyPlayedComponent implements OnInit{
  tracks!:Track[];
  @ViewChild('tracksCard', { static: true }) tracksCard!: ElementRef;
  constructor(){
  }
  ngOnInit(): void {
    this.tracks = this.mockData();
  }
  scollLeft(){
    this.tracksCard.nativeElement.scrollBy({ left: -200*5, behavior: "smooth" });
  }
  scollRight(){
    this.tracksCard.nativeElement.scrollBy({ left: 200*5, behavior: "smooth" });
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
        cover_image_path:"/assets/images/background/bg-galaxy-1.jpg",
        duration:'0:12',
        create_at:'01/01/2025',
      }
      mock_tracks.push(track);
    }
    return mock_tracks;
  }
}
