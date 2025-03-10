import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { ErrorHandlerService } from './error-handler-service';

@Injectable({
  providedIn: 'root', // Đăng ký service ở root để dùng toàn app
})
export class AuthService {
  private apiUrl = 'http://localhost:8888/api/identity'; // Thay URL bằng API của bạn

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  register(userData: any): Observable<ApiResponse<any>> {
    return this.http
      .post<ApiResponse<any>>(`${this.apiUrl}/users/registration`, userData)
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  login(credentials: {
    username: string;
    password: string;
  }): Observable<ApiResponse<any>> {
    return this.http
      .post<ApiResponse<any>>(`${this.apiUrl}/authenticate/login`, credentials)
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Đăng xuất
  logout(): void {
    localStorage.removeItem('auth_token');
  }
  checkUsernameExisted(username: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${this.apiUrl}/authenticate/check-username/${username}`
    );
  }
}
