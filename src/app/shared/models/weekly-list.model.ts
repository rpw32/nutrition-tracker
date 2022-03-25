import { InternalRecipe, Recipe } from './recipe.model';


export interface RecipeDay {
   name: string;
   recipes: InternalRecipe[];
}

export interface InternalRecipeDay extends RecipeDay {
   open: boolean;
   name: string;
   recipes: InternalRecipe[];
}

export class WeeklyScheduleUpdate {
   dayIndex: number;
   mealIndex: number;
   recipe: Recipe;

   public constructor(mealInd: number, dayIndex: number, init?: Partial<Recipe>) {
      this.recipe = new Recipe(init);
      this.dayIndex = dayIndex;
      this.mealIndex = mealInd;
      return this;
  }
}

export interface WeeklySchedule {
   _id: string;
   days: RecipeDay[];
}
