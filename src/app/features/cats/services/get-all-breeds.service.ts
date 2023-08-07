import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY } from '@src/src/assets/api.key';
import { Observable, map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllBreedsService {
  URL =
    'https://api.thecatapi.com/v1/images/search?limit=100&has_breeds=1&api_key=';
  key = '';

  constructor(private _http: HttpClient) {
    this.key = API_KEY.api_key;
  }

  getAllBreeds(): Observable<any> {
    return this._http.get<any>(this.URL + this.key);
  }
}
