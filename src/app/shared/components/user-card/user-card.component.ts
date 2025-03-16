import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: false,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() avatar: string = '/assets/images/image.png';
  @Input() name!: string;
  @Input() followers!: number;
  @Input() tracks!: number;
  constructor(){
    this.name='abc'
    this.followers=100;
    this.tracks=100;
  }
}
