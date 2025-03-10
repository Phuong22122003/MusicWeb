import { Component, ElementRef, ViewChild } from '@angular/core';
import { PlayList,RelatedTrack } from '../../../../core/models/playlist';
import { Track } from '../../../../core/models/track';

@Component({
  selector: 'app-recommended-playlist',
  standalone: false,
  templateUrl: './recommended-playlist.component.html',
  styleUrl: './recommended-playlist.component.scss'
})
export class RecommendedPlaylistComponent {
  playlists!:RelatedTrack[];
  @ViewChild('playlistsCard', { static: true }) playlistsCard!: ElementRef;
  constructor(){
    this.playlists = this.mockData();
  }
  scollLeft(){
    this.playlistsCard.nativeElement.scrollBy({ left: -200*5, behavior: "smooth" });
  }
  scollRight(){
    this.playlistsCard.nativeElement.scrollBy({ left: 200*5, behavior: "smooth" });
  }
  mockData(){
    const mock_data:RelatedTrack[] =[];
    for(let i=0;i<9;i++){

      mock_data.push({
        playlistId:`${i}`,
        trackName:`Track ${i}`,
        trackPath:`/assets/images/image.png`,
        authors:'LynkNguyen, DenVau, abc,'
      })
    }
    return mock_data;
  }
}
