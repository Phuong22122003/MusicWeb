import { Component, Input, OnInit } from '@angular/core';
import { Track } from '../../../../core/models/track';
import { UserProfile } from '../../../../core/models/user_profile';
import { environment } from '../../../../../environments/environment';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-track-play',
  standalone: false,
  templateUrl: './track-play.component.html',
  styleUrl: './track-play.component.scss',
})
export class TrackPlayComponent implements OnInit {
  @Input('track') track!: Track;
  @Input('profile') profile!: UserProfile;
  trackBaseUrl = environment.fileApi + '/audios';
  muted: boolean = true;
  ngOnInit(): void {
    console.log(this.track.createdAt);
  }
  onPlay() {
    this.muted = !this.muted;
    console.log(this.muted);
  }
  timeAgo(date: string) {
    console.log(date);
    return formatDistanceToNow(new Date(date.split('.')[0]), {
      addSuffix: true,
    });
  }
}
