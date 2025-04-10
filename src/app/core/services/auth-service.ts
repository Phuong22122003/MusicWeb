import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  interval,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { ApiResponse } from '../models/api_response';
import { ErrorHandlerService } from './error-handler-service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedInSubject.asObservable();
  isOpenAuthModal = new Subject<boolean>();
  private apiUrl = environment.apiBaseUrl + '/identity';
  private tokenCheckInterval?: Subscription;
  redirectUrl = '';

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {
    this.startTokenCheck();
  }

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
    this.loggedInSubject.next(true);
    this.startTokenCheck();
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  decodeToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload); // decode base64
      return JSON.parse(decoded);
    } catch (err) {
      console.error('Invalid JWT token:', err);
      return null;
    }
  }

  getUserId(): string | null {
    const decoded = this.decodeToken();
    return decoded?.sub || null;
  }

  isLoggedIn(): boolean {
    const decoded = this.decodeToken();
    if (!decoded || !decoded.exp) return false;

    const now = Math.floor(Date.now() / 1000); // in seconds
    return decoded.exp > now;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.loggedInSubject.next(false);
    this.tokenCheckInterval?.unsubscribe();
    this.router.navigate(['home']);
  }

  checkUsernameExisted(username: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${this.apiUrl}/authenticate/check-username/${username}`
    );
  }

  private startTokenCheck(): void {
    this.tokenCheckInterval = interval(5000).subscribe(() => {
      const isValid = this.isLoggedIn();
      this.loggedInSubject.next(isValid);
      if (!isValid) {
        this.logout();
      }
    });
  }
}
