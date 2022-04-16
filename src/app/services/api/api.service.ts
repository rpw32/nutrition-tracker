import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getSchedule(_id: string, options: any): Observable<any> {
    console.log('Calling getSchedule: ', options);
    return this.http.get(this.baseUrl + '/schedule/' + _id, options).pipe(
      map(
        data => {
          console.log('Got the schedule for the requested id: ', data);
          return data;
        }
      ),
      catchError(
        err => {
          console.log('GET ERROR: ', err);
                    // the of() function returns to the subscriber
          // whatever value is inside it.
          return of(1);
        }
      )
    )
  }

  updateSchedule(_id: string, mealIndex: number, dayIndex: number, input: string, options: any): Observable<any> {
    console.log('Calling updateSchedule: ', options);
    return this.http.post(this.baseUrl + `/schedule/${_id}/${dayIndex.toString()}/${mealIndex.toString()}`, input, options).pipe(
      map(
        data => {
          console.log('Posted new schedule update! Data posted: ', data);
          return data;
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

  get50Recipes(options: any): Observable<any> {
    console.log('Calling get50Recipes: ', options);
    return this.http.get(this.baseUrl + '/recipes', options).pipe(
      map(
        data => {
          console.log('Recipe data retrieved! Data returned: ', data);
          return data;
        }
      ),
      catchError(
        err => {
          console.log('GET ERROR: ', err);
          // the of() function returns to the subscriber
          // whatever value is inside it.
          return of(1);
        }
      )
    );
  }


  addRecipe(input: string, options: any): Observable<any> {
    console.log('Calling addRecipe: ', input, options);
    return this.http.post(this.baseUrl + '/recipes', input, options).pipe(
      map(
        data => {
          console.log('Posted new recipe data! Data posted: ', data);
          return data;
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
    return this.http.put(this.baseUrl + '/recipes', input, options).pipe(
      map(
        data => {
          console.log('PUT updated recipe data! Data posted: ', data);
          return 0;
        }
      ),
      catchError(
        err => {
          console.log('PUT ERROR: ', err);
          // the of() function returns to the subscriber
          // whatever value is inside it.
          return of(1);
        }
      )
    );
  }
}

