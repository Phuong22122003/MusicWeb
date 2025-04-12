import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { ProfileService } from '../../../core/services/profile.service';
import { UserProfile } from '../../../core/models/user_profile';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  userProfile!: UserProfile;
  avatarUrl = environment.fileApi + '/image/avatar';
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.profileService
        .getProfileById(this.authService.getUserId() as string)
        .subscribe((apiResponse) => {
          this.userProfile = apiResponse.data;
        });
    });
  }

  onShowAuthModal() {
    this.authService.isOpenAuthModal.next(true);
  }
  onCloseModal() {
    this.authService.isOpenAuthModal.next(false);
  }
  onLogOut() {
    this.authService.logout();
    this.router.navigate(['home']);
  }
}
