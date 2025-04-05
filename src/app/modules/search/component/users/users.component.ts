import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/seach/user';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  users: User[] = [];

  ngOnInit(): void {
    for (let i = 1; i <= 10; i++) {
      this.users.push({
        id: i.toString(),
        profile_picture:'https://i1.sndcdn.com/avatars-YRAYdgMxT4bizZjH-z8Km4w-t500x500.jpg',
        username: `user${i}`,
        lastname: `Last${i}`,
        firstname: `First${i}`,
        followers: Math.floor(Math.random() * 200)
      });
    }
  }
  
}
