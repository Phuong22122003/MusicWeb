import { Component, Input } from '@angular/core';
import { User } from '../../../../../core/models/seach/user';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  isFollowing = false;
  @Input() user: User ={
    id: '123',
    profile_picture: 'https://i1.sndcdn.com/avatars-YRAYdgMxT4bizZjH-z8Km4w-t500x500.jpg',
    username: 'johndoe',
    lastname: 'Doe',
    firstname: 'John',
    followers: 100
  }
  toggleFlow(){
    this.isFollowing = !this.isFollowing;
  }
}
