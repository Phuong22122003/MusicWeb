import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api_response';
import { Page } from '../models/page';
import { UserProfile } from '../models/user_profile';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private baseUrl = `${environment.apiBaseUrl}/profile/follows`;
  private baseAuthUrl = `${environment.apiBaseUrl}/profile/auth/follows`;

  constructor(private http: HttpClient) {}

  // 🔄 Follow user
  followUser(followData: {
    followingId: string;
  }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.baseAuthUrl, followData);
  }

  // 🚫 Unfollow user
  unfollowUser(userId: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(
      `${this.baseAuthUrl}/unfollow/${userId}`
    );
  }

  // 👥 Get followers
  getFollowers(
    userId: string,
    page = 0,
    size = 10
  ): Observable<ApiResponse<Page<UserProfile>>> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<UserProfile>>>(
      `${this.baseUrl}/get-followers/${userId}`,
      { params }
    );
  }

  // 👉 Get followings
  getFollowings(
    userId: string,
    page = 0,
    size = 10
  ): Observable<ApiResponse<Page<UserProfile>>> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<UserProfile>>>(
      `${this.baseUrl}/get-followings/${userId}`,
      { params }
    );
  }

  isFollowing(
    followerId: string,
    followingId: string
  ): Observable<ApiResponse<boolean>> {
    const params = new HttpParams()
      .set('followerId', followerId)
      .set('followingId', followingId);

    return this.http.get<ApiResponse<boolean>>(`${this.baseUrl}/is-following`, {
      params,
    });
  }
}
