import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from '../../../../core/models/user_profile';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  @Input('profile') profile!: UserProfile;
  loggedUserId!: string | null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedUserId = this.authService.getUserId();
  }
}
