import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnChanges, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnChanges {

  recipes: Recipe[];
  recipesChange: Subject<Recipe[]> = new Subject<Recipe[]>();

  constructor(private api: ApiService, private http: HttpClient) {
    this.http.get('assets/test-json/recipe.json').subscribe(data => {
      this.recipes = data['recipes'].map(recipe => {
        return new Recipe(recipe);
      });
      console.log(this.recipes);
      this.updateRecipeSusbcribers();
    });
   }

  ngOnChanges()
  {
    console.log('Recipe onChanges activated');
    this.updateRecipeSusbcribers();
  }

  updateRecipeSusbcribers()
  {
    this.recipesChange.next(this.recipes);
  }

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

  updateRecipe(recipe: Recipe): Observable<any> {
    const paramString = JSON.stringify(recipe);
    const paramObj = JSON.parse(paramString);

    console.log('Entered the updateRecipe function');

    // set headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    console.log('returning api');
    // submit form to backend to get name by email
    return this.api.updateRecipe(paramObj, httpOptions).pipe(
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
