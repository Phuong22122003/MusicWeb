import { Component } from '@angular/core';

@Component({
  selector: 'app-comment',
  standalone: false,
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  selectedSortType: string = 'newest';

  commentSortTypes = [
    { id: 'newest', name: 'Newest' },
    { id: 'oldest', name: 'Oldest' },
    { id: 'track-time', name: 'Track Time' },
  ];
}
