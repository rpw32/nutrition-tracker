import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { InternalRecipeDay, RecipeDay } from '../../shared/models/weekly-list.model';
import { ApiService } from '../api/api.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // TODO: Make this id come from some unique identifier for a user
  // This might be something from an authentication service that can be verified
  // by the service and the backend can verify that the user is authorized to make
  // the request by pinging the auth service for the expected key
  id: string = "61ea463459bd501f9b844002";

  schedule: RecipeDay[];
  scheduleChange: BehaviorSubject<RecipeDay[]> = new BehaviorSubject<RecipeDay[]>([]);

  recipes: Recipe[];
  recipesChange: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);

  constructor(private api: ApiService, private storage: StorageService) {

    let recipeResponse = this.get50Recipes().subscribe(data => {
      let recipeResponse = data['recipes'] as string;
      this.recipes = JSON.parse(recipeResponse) as Recipe[];
      this.updateRecipeSusbcribers();
    });

    this.getSchedule();
   }

  async getSchedule() {
    await this.storage.getSchedule(this.id).then(val => {
      this.schedule = val;
      console.log(val);
    });
    console.log(this.schedule);

    let schedule = Array<RecipeDay>();
    this.getRemoteSchedule().subscribe(data => {
      if (data['result']) {
        let scheduleResponse = data['schedule'] as string;
        schedule = JSON.parse(scheduleResponse)['days'] as RecipeDay[];
        if (this.schedule.length == 0)
        {
          this.schedule = schedule;
          this.storage.setSchedule(this.id, schedule);
        }
      }
    });

    this.updateScheduleSusbcribers();
  }

  async updateSchedule(mealIndex: number, dayIndex: number, scheduleUpdate: Recipe) {
    // Update local storage first
    this.schedule = await this.storage.updateSchedule(this.id, mealIndex, dayIndex, scheduleUpdate);

    // Send the update off to the remote storage
    this.updateRemoteSchedule(mealIndex, dayIndex, scheduleUpdate).subscribe();

    this.updateScheduleSusbcribers();
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
          if  ((data !== -1) && (data != null) && data['result']){
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

  private getRemoteSchedule(): Observable<any> {
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
          if  ((data !== -1) && (data != null) && data['result']){
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

  private updateRemoteSchedule(mealIndex: number, dayIndex: number, scheduleUpdate: Recipe): Observable<any> {
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
    return this.api.updateSchedule(this.id, mealIndex, dayIndex, paramObj, httpOptions).pipe(
      map(
        data => {
          if  ((data !== -1) && (data != null) && data['result']){
            console.log('Success');// successfully retrieved recipes
            this.updateScheduleArray(mealIndex, dayIndex, scheduleUpdate);
            return data;
          }
          else {
            // couldn't find a name
            console.log('Failure');
            this.updateScheduleSusbcribers();
            return false;
          }
        },
      )
    );
  }

  private updateScheduleSusbcribers()
  {
    this.scheduleChange.next(this.schedule);
  }

   private updateRecipeSusbcribers()
  {
    this.recipesChange.next(this.recipes);
  }

  /// UTILITY FUNCTIONS
  /// {
  // Finds the recipe in the service's recipe array and updates it with the given recipe
  private updateRecipeArray(recipeUpdate: Recipe) {
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

  // Updates the recipe in the service's schedule at the given indices
  private updateScheduleArray(mealIndex: number, dayIndex: number, recipeUpdate: Recipe) {
    // Quick sanity check
    if (mealIndex >= 0 && dayIndex >= 0) {
      this.schedule[dayIndex].recipes[mealIndex].recipe = recipeUpdate;
    }
  }


  private findIndexToUpdate(newItem) {
    return newItem._id === this;
  }
  /// }
}
