import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeDay } from 'src/app/shared/models/weekly-list.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  private weekdays: Array<string> = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    console.log('Storage created!');
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async setSchedule(key: string, value: RecipeDay[]) {
    this._storage?.set(key, value);
    console.log('Setting schedule');
  }

  public async getSchedule(key: string) : Promise<RecipeDay[]> {
    let retVal: RecipeDay[] = Array<RecipeDay>();
    await this._storage?.get(key).then(val =>
      {
        retVal = val;
        console.log(val);
      }
    );
    console.log(retVal);
    return retVal ?? this.getDefaultSchedule();
  }

  public async updateSchedule(key: string, mealIndex: number, dayIndex: number, recipe: Recipe) : Promise<RecipeDay[]> {
    console.log('Updating stored schedule');
    let updateRecipe = await this._storage?.get(key) as RecipeDay[];
    console.log(updateRecipe);
    updateRecipe[dayIndex].recipes[mealIndex].recipe = recipe;
    return await this._storage?.set(key, updateRecipe);
  }

  private getDefaultSchedule() : RecipeDay[] {
    const defaultSchedule : RecipeDay[] = this.weekdays.map(val=> {
      return new RecipeDay(val);
    });
    return defaultSchedule;
  }
}


