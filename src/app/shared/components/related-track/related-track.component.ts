import { Component,Input } from '@angular/core';
import {RelatedTrack } from '../../../core/models/playlist';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-related-track',
  standalone: false,
  templateUrl: './related-track.component.html',
  styleUrl: './related-track.component.scss'
})
export class RelatedTrackComponent {
  
  @Input() relatedTrack!:RelatedTrack;

   isShow = false;
   @Input() isLiked = false;
   @Input() isFollowed =false;
   constructor(private router: Router){}
   goToPlaylist(){
     // this.router.navigate(['track',this.track.id]);
     alert('go to track')
   }
 
   playTrack(){
     alert('play')
   }
 
   prevent(){
 
   }
 
   toggleLike():Observable<any>{
     return of(true);
   }
   toggleFollow():Observable<any>{
     return of(true);
   }
}
