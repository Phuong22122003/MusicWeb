import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FollowService } from '../../../../core/services/follow.service';
import { UserProfile } from '../../../../core/models/user_profile';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-stat-bar',
  standalone: false,
  templateUrl: './stat-bar.component.html',
  styleUrl: './stat-bar.component.scss',
})
export class StatBarComponent implements OnInit, OnChanges {
  @Input() userId!: string;
  followings: UserProfile[] = [];
  followers: UserProfile[] = [];

  constructor(
    private followService: FollowService,
    private toast: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.userId) {
      this.loadFollowData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && !changes['userId'].firstChange) {
      this.loadFollowData();
    }
  }

  loadFollowData(): void {
    forkJoin({
      followings: this.followService.getFollowings(this.userId, 0, 5),
      followers: this.followService.getFollowers(this.userId, 0, 5),
    }).subscribe({
      next: ({ followings, followers }) => {
        this.followings = followings.data.content;
        this.followers = followers.data.content;
      },
      error: (err) => {
        this.toast.error('Fail to load follow data: ' + err.message, 'Error');
      },
    });
  }

  unfollow(userId: string): void {
    this.followService.unfollowUser(userId).subscribe(() => {
      this.followings = this.followings.filter(
        (user) => user.userId !== userId
      );
    });
  }

  trackByUserId(index: number, user: UserProfile): string {
    return user.userId; // dùng userId thay vì email nếu có thể
  }
}
