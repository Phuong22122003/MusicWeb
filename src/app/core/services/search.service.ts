import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler-service';
import { catchError, map, Observable } from 'rxjs';
import { ApiResponse } from '../models/api_response';
import { Track } from '../models/track';
@Injectable({
  providedIn: 'root', // Đăng ký service ở root để dùng toàn app
})
export class SearchService {
  private apiUrl = environment.apiBaseUrl + '/search';
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}
  searchTrackIds(query: string): Observable<string[]> {
    return this.http
        .get<ApiResponse<string[]>>(this.apiUrl + `/tracks?q=${query}` )
        .pipe(
            map(response=>response.data),
            catchError(this.errorHandlerService.handleError)
        );
  }

}
