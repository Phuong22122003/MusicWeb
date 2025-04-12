import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler-service';
import { catchError, Observable } from 'rxjs';
import { ApiResponse } from '../models/api_response';
import { Track } from '../models/track';
@Injectable({
  providedIn: 'root', // Đăng ký service ở root để dùng toàn app
})
export class TrackService {
  private apiUrl = environment.apiBaseUrl + '/music-service/track';
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}
  getTrackById(trackId: string): Observable<ApiResponse<Track>> {
    return this.http
      .get<ApiResponse<Track>>(this.apiUrl + '/' + trackId)
      .pipe(catchError(this.errorHandlerService.handleError));
  }
}
