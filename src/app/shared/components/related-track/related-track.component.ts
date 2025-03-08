import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-related-track',
  standalone: false,
  templateUrl: './related-track.component.html',
  styleUrl: './related-track.component.scss'
})
export class RelatedTrackComponent {
  @Input() songTitle: string = '';
  @Input() author: string = '';
  @Input() songImage: string = '';
}
