import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  isShow = false;
  @Input() isLiked = false;
  @Input() isFollowed =false;
  @Input() goTo!:()=>void;
  @Input() playTrack!:()=>void;
  @Input() toggleLike!:()=>Observable<any>;
  @Input() toggleFollow!:()=>Observable<any>;
  constructor(){}

  playTrackInnerCard(event:any){
    event.stopPropagation();
    this.playTrack();
  }

  toggleLikeInnerCard(event:any){
    event.stopPropagation();

    this.toggleLike().subscribe(()=>{
      this.isLiked = !this.isLiked;
    });
  }
  
  toggleFollowInnerCard(event:any){
    event.stopPropagation();
    this.toggleFollow().subscribe(()=>{
      this.isFollowed = !this.isFollowed;
    });
  }

  prevent(event:any){
    event.stopPropagation();
  }
  showPlayButton(){
    this.isShow=true;
  }
  hiddenPlayButton(){
    this.isShow=false;
  }
}
