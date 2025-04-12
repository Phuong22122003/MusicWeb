import { Component, OnInit } from '@angular/core';
import { Track } from '../../../../../core/models/track';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track-tab',
  standalone: false,
  templateUrl: './track-tab.component.html',
  styleUrl: './track-tab.component.scss',
})
export class TrackTabComponent implements OnInit {
  routePath = '';
  track: Track = {
    id: '12345',
    name: 'My Track Name',
    title: 'Track Title',
    description: 'A description of the track.',
    fileName: 'assets/music/track1.mp3',
    coverImagePath: 'assets/images/image.png',
    userId: 'user123',
    duration: '3:45',
    createdAt: '2025-04-07T12:00:00Z',
    username: 'john_doe',
    liked: 150,
    played: 2000,
    comment: 45,
  };
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    const routePath = this.route.snapshot.url[0]?.path;
    console.log(routePath);
  }
}
