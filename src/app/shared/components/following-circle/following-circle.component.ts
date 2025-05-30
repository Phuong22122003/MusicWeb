import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from '../../../core/models/user_profile';
import { ProfileService } from '../../../core/services/profile.service';
import { FollowService } from '../../../core/services/follow.service';
import { AuthService } from '../../../core/services/auth-service';
import { AVATAR_BASE_URL } from '../../utils/url';

@Component({
  selector: 'app-following-circle',
  standalone: false,
  templateUrl: './following-circle.component.html',
  styleUrl: './following-circle.component.scss',
})
export class FollowingCircleComponent implements OnInit {
  @Input({ required: true }) profile!: UserProfile;
  avatarUrl = AVATAR_BASE_URL;
  isFollow = false;
  countFollow = 0;
  loggedUserId!: string | null;

  constructor(
    private profileService: ProfileService,
    private followService: FollowService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.countFollow = this.profile.followerCount || 0;
    this.loggedUserId = this.authService.getUserId();
    if (!this.loggedUserId) return;

    this.followService
      .isFollowing(this.loggedUserId, this.profile.userId)
      .subscribe((res) => {
        this.isFollow = res.data;
      });

    this.followService.followChange$.subscribe((change) => {
      if (change.userId === this.profile.userId) {
        if (change.action === 'follow') {
          this.countFollow++;
          this.isFollow = true;
        } else {
          this.countFollow--;
          this.isFollow = false;
        }
        this.profile.followerCount = this.countFollow;
      }
    });
  }

  toggleFollow() {
    console.log('Before toggle:', this.isFollow);
    if (!this.loggedUserId) return;

    const currentFollowState = this.isFollow;
    const action = currentFollowState
      ? this.followService.unfollowUser(this.profile.userId)
      : this.followService.followUser({ followingId: this.profile.userId });

    action.subscribe((res) => {
      if (currentFollowState) {
        this.countFollow--;
      } else {
        this.countFollow++;
      }
      this.profile.followerCount = Math.max(this.countFollow, 0);
      this.isFollow = !currentFollowState;
      console.log('After toggle:', this.isFollow);
    });
  }
}
