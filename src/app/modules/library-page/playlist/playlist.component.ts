import { Component, OnInit } from '@angular/core';
import { RelatedTrack } from '../../../core/models/playlist';

@Component({
  selector: 'app-playlist',
  standalone: false,
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent implements OnInit{
  options=['All','Created','Liked'];  
  selectedOption: string = 'All';
  playlists!:RelatedTrack[];
  constructor() {
    this.playlists = this.mockData();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
