import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackService } from '../../../core/services/track.service';
import { Track } from '../../../core/models/track';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../../core/services/profile.service';
import { UserProfile } from '../../../core/models/user_profile';
import { switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-play-music',
  standalone: false,
  templateUrl: './play-music.component.html',
  styleUrl: './play-music.component.scss',
})
export class PlayMusicComponent implements OnInit {
  trackId!: string;
  track!: Track;
  profile!: UserProfile;
  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService,
    private toast: ToastrService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.trackId = params.get('trackId')!;
          return this.trackService.getTrackById(this.trackId);
        }),
        switchMap((trackRes) => {
          this.track = trackRes.data;
          console.log(this.track);
          return this.profileService.getProfileById(this.track.userId);
        })
      )
      .subscribe({
        next: (profileRes) => {
          this.profile = profileRes.data;
          console.log(profileRes);
        },
        error: (err) => {
          this.toast.error(err.message, 'Error');
        },
      });
  }
}
