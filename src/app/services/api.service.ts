import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  addRecipe(input: string, options: any): Observable<any> {
    console.log('Calling addRecipe: ', input, options);
    return this.http.post(this.baseUrl + '/add', input, options).pipe(
      map(
        data => {
          console.log('Posted new recipe data! Data posted: ', data);
          return 0;
        }
      ),
      catchError(
        err => {
          console.log('POST ERROR: ', err);
          // the of() function returns to the subscriber
          // whatever value is inside it.
          return of(1);
        }
      )
    );
  }

  updateRecipe(input: string, options: any): Observable<any> {
    console.log('Calling updateRecipe: ', input, options);
    return this.http.post(this.baseUrl + '/update', input, options).pipe(
      map(
        data => {
          console.log('Posted updated recipe data! Data posted: ', data);
          return 0;
        }
      ),
      catchError(
        err => {
          console.log('POST ERROR: ', err);
          // the of() function returns to the subscriber
          // whatever value is inside it.
          return of(1);
        }
      )
    );
  }
}

