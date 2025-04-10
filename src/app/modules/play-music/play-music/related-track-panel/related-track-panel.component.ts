import { Component } from '@angular/core';

@Component({
  selector: 'app-related-track-panel',
  standalone: false,
  templateUrl: './related-track-panel.component.html',
  styleUrl: './related-track-panel.component.scss',
})
export class RelatedTrackPanelComponent {
  soundCards = [
    {
      author: 'ngochan',
      songTitle: 'đây là Đài tiếng nói Việt Nam',
      playCount: 2714,
      likeCount: 14,
      repeatCount: 2,
      commentCount: 4,
    },
    {
      author: 'johnDoe',
      songTitle: 'Bài hát bất hủ',
      playCount: 1500,
      likeCount: 25,
      repeatCount: 5,
      commentCount: 10,
    },
    {
      author: 'janeDoe',
      songTitle: 'Giai điệu tuổi trẻ',
      playCount: 3200,
      likeCount: 50,
      repeatCount: 8,
      commentCount: 15,
    },
  ];
}
