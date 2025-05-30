import { Component, Input, OnInit } from '@angular/core';
import { Track } from '../../../../../core/models/track';
import { ActivatedRoute } from '@angular/router';
import { TrackService } from '../../../../../core/services/track.service';
import { AuthService } from '../../../../../core/services/auth-service';
import { TrackStatisticsService } from '../../../../../core/services/track-statistic.service';

@Component({
  selector: 'app-track-tab',
  standalone: false,
  templateUrl: './track-tab.component.html',
  styleUrl: './track-tab.component.scss',
})
export class TrackTabComponent implements OnInit {
  routePath = '';
  // track: TrackAndWave = {
  //   id: '1',
  //   name: 'My Song123123',
  //   file_path: 'assets/audios/NhuNgayHomQua.mp3',
  //   cover_image_path:
  //     'https://i1.sndcdn.com/artworks-L0HsMyzKHuyVgijn-GawcCA-t500x500.jpg',
  //   user_id: '123',
  //   duration: '03:45',
  //   create_at: '2024-03-17T12:00:00Z',
  //   username: 'john_doe',
  //   liked: 150,
  //   played: 2000,
  //   comment: 45,
  // };
  tracks: Track[] = [];
  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService,
    private authService: AuthService,
    private trackStatisticService: TrackStatisticsService
  ) {}
  ngOnInit(): void {
    const routePath = this.route.snapshot.url[0]?.path;
    const userId = this.route.parent?.snapshot.paramMap.get('userId');
    if (!userId) return;

    if (routePath === 'tracks') {
      this.trackService.getTracksByUserId(userId).subscribe((res) => {
        this.tracks = res.data;
      });
    } else {
      this.trackStatisticService
        .getUserTopTracks(null, null)
        .subscribe((res) => {
          this.tracks = res.data
            .map((track) => track.track)
            .filter((track) => track !== null);
          console.log(this.tracks);
        });
    }
  }
}
