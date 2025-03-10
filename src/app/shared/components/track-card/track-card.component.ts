import { Component, Input } from '@angular/core';
import { Track } from '../../../core/models/track';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-card',
  standalone: false,
  templateUrl: './track-card.component.html',
  styleUrl: './track-card.component.scss'
})
export class TrackCardComponent {
  @Input({required:true}) track!:Track;
  isShow = false;
  isLiked = false;
  isFollowed =false;
  constructor(private router: Router){}
  goToTrack(event:any){
    // console.log(event)
    this.router.navigate(['track',this.track.id]);
    alert('go to track')
  }

  playTrack(event:any){
    event.stopPropagation();
    alert('play')
  }

  prevent(event:any){
    event.stopPropagation();
  }

  toggleLike(event:any){
    event.stopPropagation();
    this.isLiked = !this.isLiked;
  }
  toggleFollow(event:any){
    event.stopPropagation();
    this.isFollowed = !this.isFollowed;
  }

  showPlayButton(){
    this.isShow=true;
  }
  hiddenPlayButton(){
    this.isShow=false;
  }
}
