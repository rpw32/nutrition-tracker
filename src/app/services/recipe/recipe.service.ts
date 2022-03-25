import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnChanges, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { WeeklyScheduleUpdate } from 'src/app/shared/models/weekly-list.model';
import { WeeklySchedule } from '../../shared/models/weekly-list.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  id: string = "61ea463459bd501f9b844002";

  schedule: WeeklySchedule;
  scheduleChange: BehaviorSubject<WeeklySchedule> = new BehaviorSubject<WeeklySchedule>(null);

  recipes: Recipe[];
  recipesChange: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);

  constructor(private api: ApiService) {

    let recipeResponse = this.get50Recipes().subscribe(data => {
      let recipeResponse = data['recipes'] as string;
      this.recipes = JSON.parse(recipeResponse) as Recipe[];
      this.updateRecipeSusbcribers();
    });

    let scheduleResponse = this.getSchedule().subscribe(data => {
      let scheduleResponse = data['schedule'] as string;
      console.log(scheduleResponse);
      this.schedule = JSON.parse(scheduleResponse) as WeeklySchedule;
      this.updateScheduleSubscribers();
    });
   }

  updateRecipeSusbcribers()
  {
    this.recipesChange.next(this.recipes);
  }

  updateScheduleSubscribers()
  {
    this.scheduleChange.next(this.schedule);
  }

  getSchedule(): Observable<any> {
    console.log('Getting the weekly schedule');

    // set headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // submit form to backend to get name by email
    return this.api.getSchedule(this.id, httpOptions).pipe(
      map(
        data => {
          if  ((data !== -1) && (data != null)){
            console.log('Success');// successfully retrieved recipes
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

  updateSchedule(scheduleUpdate: WeeklyScheduleUpdate): Observable<any> {
    console.log('Sending the schedule update to the server');

    const paramString = JSON.stringify(scheduleUpdate);
    const paramObj = JSON.parse(paramString);

    // set headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // submit form to backend to get name by email
    return this.api.updateSchedule(paramObj, httpOptions).pipe(
      map(
        data => {
          if  ((data !== -1) && (data != null)){
            console.log('Success');// successfully retrieved recipes
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

  get50Recipes(): Observable<any> {
    console.log('Entered the get50Recipes function');

    // set headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // submit form to backend to get name by email
    return this.api.get50Recipes(httpOptions).pipe(
      map(
        data => {
          if  ((data !== -1) && (data != null)){
            console.log('Success');// successfully retrieved recipes
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
            if (data['_id'])
            {
              recipe['_id'] = data['_id'];
              this.updateRecipeArray(recipe);
            }
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
            console.log(data);
            if (recipe)
            {
              this.updateRecipeArray(recipe);
            }
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

  /// UTILITY FUNCTIONS
  /// {
    updateRecipeArray(recipeUpdate: Recipe) {
      const updateItem = this.recipes.find(this.findIndexToUpdate, recipeUpdate._id);
      const index = this.recipes.indexOf(updateItem);
  
      if (index !== -1)
      {
        this.recipes[index] = recipeUpdate;
      }
      else
      {
        this.recipes.push(recipeUpdate);
      }
  
      this.updateRecipeSusbcribers();
      console.log(this.recipes);
    }
  
  
    findIndexToUpdate(newItem) {
      return newItem._id === this;
    }
  /// }
}
