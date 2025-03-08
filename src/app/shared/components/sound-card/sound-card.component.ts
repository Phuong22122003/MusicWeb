import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-sound-card',
  standalone: false,
  templateUrl: './sound-card.component.html',
  styleUrl: './sound-card.component.scss'
})
export class SoundCardComponent {
  @Input() avatar: string = 'assets/ava.png';
  @Input() author: string = 'Unknown';
  @Input() songTitle: string = 'Unknown Song';
  @Input() playCount: number = 0;
  @Input() likeCount: number = 0;
  @Input() repeatCount: number = 0;
  @Input() commentCount: number = 0;
}
