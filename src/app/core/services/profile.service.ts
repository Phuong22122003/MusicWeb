import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler-service';
import { ApiResponse } from '../models/api_response';
import { catchError, Observable } from 'rxjs';
import { UserProfile } from '../models/user_profile';
import { environment } from '../../../environments/environment';
export interface ProfileUpdateRequest {
  firstName: string;
  lastName: string;
  dob: string; // ISO string, ví dụ: '2000-10-31'
  gender: boolean;
  displayName: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = environment.apiBaseUrl + '/profile/users';
  private apiAuthUrl = environment.apiBaseUrl + '/profile/auth/users';
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}
  getProfileById(userId: string): Observable<ApiResponse<UserProfile>> {
    return this.http
      .get<ApiResponse<UserProfile>>(`${this.apiUrl}/` + userId)
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  uploadAvatar(avatar: FormData): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.apiAuthUrl}/upload-avatar`,
      avatar
    );
  }

  uploadCover(cover: FormData): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.apiAuthUrl}/upload-cover`,
      cover
    );
  }

  updateProfile(
    profile: ProfileUpdateRequest
  ): Observable<ApiResponse<UserProfile>> {
    return this.http.put<ApiResponse<UserProfile>>(
      this.apiAuthUrl + '/update-my-info',
      profile
    );
  }
}
