import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeDay, WeeklyList } from 'src/app/shared/models/weekly-list.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

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
  public async setSchedule(key: string, value: WeeklyList) {
    this._storage?.set(key, value);
    console.log('Setting schedule');
  }

  public async getSchedule(key: string) : Promise<WeeklyList> {
    let retVal: WeeklyList = new WeeklyList();
    await this._storage?.get(key).then(val =>
      {
        retVal = val;
        console.log(val);
      }
    );
    console.log(retVal);
    if (!retVal) {
      retVal = new WeeklyList();
      await this._storage?.set(key, retVal);
    }
    return retVal
  }

  public async updateSchedule(key: string, mealIndex: number, dayIndex: number, updateTime: number, recipe: Recipe) : Promise<WeeklyList> {
    console.log('Updating stored schedule');
    let updateRecipe = await this._storage?.get(key) as WeeklyList;
    console.log(updateRecipe);
    if (updateRecipe) {
      updateRecipe.updateTime = updateTime;
      updateRecipe.days[dayIndex].recipes[mealIndex].recipe = recipe;
    }
    else {
      console.log("Could not retrieve the recipe schedule. Unable to process update");
    }
    return await this._storage?.set(key, updateRecipe);
  }
}


