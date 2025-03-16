import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  soundCards = [
    {
      author: 'ngochan',
      songTitle: 'đây là Đài tiếng nói Việt Nam',
      playCount: 2714,
      likeCount: 14,
      repeatCount: 2,
      commentCount: 4
    },
    {
      author: 'johnDoe',
      songTitle: 'Bài hát bất hủ',
      playCount: 1500,
      likeCount: 25,
      repeatCount: 5,
      commentCount: 10
    },
    {
      author: 'janeDoe',
      songTitle: 'Giai điệu tuổi trẻ',
      playCount: 3200,
      likeCount: 50,
      repeatCount: 8,
      commentCount: 15
    }
  ];
}
