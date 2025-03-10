import { Component,Input } from '@angular/core';
import {RelatedTrack } from '../../../core/models/playlist';

@Component({
  selector: 'app-related-track',
  standalone: false,
  templateUrl: './related-track.component.html',
  styleUrl: './related-track.component.scss'
})
export class RelatedTrackComponent {
  
  @Input() relatedTrack!:RelatedTrack;

  isHovered = false;
  isLiked = false;

  prevent(event:any){
    event.stopPropagation();
  }
  playTrack(event:any){
    event.stopPropagation();
    alert('play')
  }
  toggleLike(event:any){
    event.stopPropagation();
    this.isLiked = !this.isLiked;
  }
  
  showPlayButton(){
    this.isHovered=true;
  }
  hiddenPlayButton(){
    this.isHovered=false;
  }
}
