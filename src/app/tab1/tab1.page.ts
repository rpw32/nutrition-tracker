import { RecipeService } from '../services/recipe/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';
import { Subscription } from 'rxjs';
import { InternalRecipeDay, WeeklyScheduleUpdate } from '../shared/models/weekly-list.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  _recipeSubscription: Subscription;
  _scheduleSubscription: Subscription;
  recipes: Recipe[];
  recipeSchedule: InternalRecipeDay[];
  startEnd = this.getFirstDayOfWeek();

  automaticClose = false;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit()
  {
    this._recipeSubscription = this.recipeService.recipesChange.subscribe((value) => {
      this.recipes = value;
    });

    this._scheduleSubscription = this.recipeService.scheduleChange.subscribe((value) => {
      this.recipeSchedule = value.days as InternalRecipeDay[];
    });
  }

  toggleSection(i) {
    this.recipeSchedule[i].open = !this.recipeSchedule[i].open;

    if (this.automaticClose && this.recipeSchedule[i].open)
    {
      this.recipeSchedule
        .filter((item, itemIndex) => itemIndex !== i)
        .map(item => item.open = false);
    }
  }

  getFirstDayOfWeek()
  {
    const startDate = new Date();
    let diff = startDate.getDate() - startDate.getDay();;
    startDate.setDate(diff);

    const endDate = new Date();
    diff = startDate.getDate() + 6;
    endDate.setDate(diff);

    return [startDate, endDate];
  }

  changedRecipe(ind: number, day: string, event: CustomEvent)
  {
    const updateItem = this.recipeSchedule.find(this.findIndexToUpdate, day);
    const index = this.recipeSchedule.indexOf(updateItem);

    console.log(ind);

    if (index !== -1)
    {
      console.log(index);
      console.log(event);
      const changedRecipe: Recipe = event.detail.value as Recipe;
      this.recipeSchedule[index].recipes[ind].recipe = changedRecipe;
      console.log('changed');

      const updateRecipe = new WeeklyScheduleUpdate(ind, index, changedRecipe);
      this.recipeService.updateSchedule(updateRecipe).subscribe();
    }

    console.log(this.recipeSchedule);
  }

  findIndexToUpdate(newItem) {
    return newItem['name'] === this;
  }

  compareWith(r1: Recipe, r2: Recipe) {
    return r1 && r2 ? r1._id === r2._id : r1 === r2;
  }

  indexTracker(index: number, value: any) {
    return index;
}

}

