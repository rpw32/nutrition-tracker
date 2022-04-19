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
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async setSchedule(key: string, value: RecipeDay[]) {
    this._storage?.set(key, value);
    console.log('Setting schedule');
  }

  public async getSchedule(key: string) : Promise<RecipeDay[]> {
    const retVal = await this._storage?.get(key);
    return retVal ?? this.getDefaultSchedule();
  }

  public async updateSchedule(key: string, mealIndex: number, dayIndex: number, recipe: Recipe) {
    console.log('Updating stored schedule');
    let updateRecipe = await this._storage?.get(key) as RecipeDay[];
    console.log(updateRecipe);
    updateRecipe[dayIndex].recipes[mealIndex].recipe = recipe;
    await this._storage?.set(key, updateRecipe);
    console.log(this._storage?.get(key));
  }

  private getDefaultSchedule() : RecipeDay[] {
    const defaultSchedule : RecipeDay[] = this.weekdays.map(val=> {
      return new RecipeDay(val);
    });
    return defaultSchedule;
  }
}


