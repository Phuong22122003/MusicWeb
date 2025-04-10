import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiResponse } from '../models/api_response';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler-service';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root', // Đăng ký service ở root để dùng toàn app
})
export class AlbumService {
  private apiUrl = environment.apiBaseUrl + '/user-library/auth/album';
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}
  uploadAlbum(albumData: FormData): Observable<ApiResponse<any>> {
    return this.http
      .post<ApiResponse<any>>(`${this.apiUrl}/add-album`, albumData)
      .pipe(catchError(this.errorHandlerService.handleError));
  }
}
