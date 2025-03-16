import { Component, ElementRef, ViewChild } from '@angular/core';
import { Artist } from '../../../../core/models/artist';

@Component({
  selector: 'app-artists',
  standalone: false,
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss'
})
export class ArtistsComponent {
  artists!:Artist[];
  @ViewChild('artistsCard', { static: true }) artistsCard!: ElementRef;
  constructor(){
  }
  ngOnInit(): void {
    this.artists = this.mockData();
  }
  scollLeft(){
    this.artistsCard.nativeElement.scrollBy({ left: -200*5, behavior: "smooth" });
  }
  scollRight(){
    this.artistsCard.nativeElement.scrollBy({ left: 200*5, behavior: "smooth" });
  }
  mockData(){
    const mock_artists:Artist[] = [];
    for(let i =0;i<10;i++){
      const track :Artist = {
        id:`${i}`,
        username:"user"+i,
        profile_picture:"/assets/images/image.png",
      }
      mock_artists.push(track);
    }
    return mock_artists;
  }
}
