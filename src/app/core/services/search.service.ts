import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler-service';
import { catchError, map, Observable, Subject } from 'rxjs';
import { ApiResponse } from '../models/api_response';
import { Track } from '../models/track';
@Injectable({
  providedIn: 'root', // Đăng ký service ở root để dùng toàn app
})
export class SearchService {
  private apiUrl = environment.apiBaseUrl + '/search-service';
  private searchChange = new Subject<string>();
  search$ = this.searchChange.asObservable();
  emitSearchChange(query: string) {
    if (!query) return;
    this.searchChange.next(query);
  }
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}
  searchTrackIds(query: string): Observable<string[]> {
    return this.http
      .get<ApiResponse<string[]>>(this.apiUrl + `/tracks?q=${query}`)
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError(this.errorHandlerService.handleError)
      );
  }

  // Tìm kiếm Users
  searchUserIds(query: string): Observable<string[]> {
    return this.http
      .get<ApiResponse<string[]>>(`${this.apiUrl}/users`, {
        params: { q: query }, // Thêm tham số query vào yêu cầu
      })
      .pipe(map((response) => response.data));
  }

  // Tìm kiếm Playlists
  searchPlaylistIds(query: string): Observable<string[]> {
    return this.http
      .get<ApiResponse<string[]>>(`${this.apiUrl}/playlists`, {
        params: { q: query }, // Thêm tham số query vào yêu cầu
      })
      .pipe(map((response) => response.data));
  }

  // Tìm kiếm Albums
  searchAlbumIds(query: string): Observable<string[]> {
    return this.http
      .get<ApiResponse<string[]>>(`${this.apiUrl}/albums`, {
        params: { q: query }, // Thêm tham số query vào yêu cầu
      })
      .pipe(map((response) => response.data));
  }
}
