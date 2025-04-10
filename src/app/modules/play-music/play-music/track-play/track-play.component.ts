import { Component } from '@angular/core';

@Component({
  selector: 'app-track-play',
  standalone: false,
  templateUrl: './track-play.component.html',
  styleUrl: './track-play.component.scss',
})
export class TrackPlayComponent {
  muted: boolean = false;

  onPlay() {
    this.muted = !this.muted;
    console.log(this.muted);
  }
}
