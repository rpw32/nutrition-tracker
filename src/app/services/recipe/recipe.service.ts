import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private api: ApiService) { }

  addRecipe(recipe: Recipe): Observable<any> {

    const paramString = JSON.stringify(recipe);
    const paramObj = JSON.parse(paramString);

    console.log('Entered the addRecipe function');

    // set headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    console.log('returning api');
    // submit form to backend to get name by email
    return this.api.addRecipe(paramObj, httpOptions).pipe(
      map(
        data => {
          if  ((data !== -1) && (data != null)){
            console.log('Success');// successfully found a name in the db for this email
            return data;
          }
          else {
            // couldn't find a name
            console.log('Failure');
            return false;
          }
        },
      )
    );
  }
}
