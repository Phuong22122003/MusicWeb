import { Component, Input } from '@angular/core';
import { Track } from '../../../core/models/track';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-track-card',
  standalone: false,
  templateUrl: './track-card.component.html',
  styleUrl: './track-card.component.scss',
})
export class TrackCardComponent {
  @Input({ required: false }) track!: Track;
  isShow = false;
  @Input() isLiked = false;
  @Input() isFollowed = false;
  constructor(private router: Router) {}
  goToTrack() {
    // this.router.navigate(['track',this.track.id]);
    alert('go to track');
  }

  playTrack() {
    alert('play');
  }

  prevent() {}

  toggleLike(): Observable<any> {
    return of(true);
  }
  toggleFollow(): Observable<any> {
    return of(true);
  }
}
