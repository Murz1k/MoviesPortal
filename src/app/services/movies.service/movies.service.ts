import {EventEmitter, Injectable} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {MovieResponse} from './responses/movie-response';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SearchResultResponse} from './responses/search-result-response';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiKey = 'PlzBanMe';

  constructor(private http: HttpClient) {
      }

  getAsync(search: string): Promise<SearchResultResponse<MovieResponse>> {
    const checkParam = (param) => isNullOrUndefined(param) ? '' : param.toString();
    const parameters = new HttpParams()
      .append('s', checkParam(search))
      .append('apikey', this.apiKey);
    return this.http.get<SearchResultResponse<MovieResponse>>(`http://www.omdbapi.com`, {params: parameters}).toPromise();
  }

  getByIdAsync(id: string): Promise<MovieResponse> {
    const checkParam = (param) => isNullOrUndefined(param) ? '' : param.toString();
    const parameters = new HttpParams()
      .append('i', checkParam(id))
      .append('apikey', this.apiKey);
    return this.http.get<MovieResponse>(`http://www.omdbapi.com`, {params: parameters}).toPromise();
  }
}
