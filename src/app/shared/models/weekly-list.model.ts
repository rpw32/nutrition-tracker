import { InternalRecipe, Recipe } from './recipe.model';

let weekdays: Array<string> = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday"
 ];

export class WeeklyList {
   updateTime: number;
   days: RecipeDay[] = [];

   public constructor() {
      this.updateTime = new Date().getTime();
      this.days = weekdays.map(val=> {
         return new RecipeDay(val);
       });
   }
}

export class RecipeDay {
   name: string;
   recipes: InternalRecipe[] = [];

   public constructor(name: string) {
      this.name = name;
      this.recipes = [new InternalRecipe("Breakfast"), new InternalRecipe("Lunch"), new InternalRecipe("Dinner")];
   }
}

export class InternalRecipeDay implements RecipeDay {
   open: boolean;
   name: string;
   recipes: InternalRecipe[] = [];

   public constructor(init?: Partial<RecipeDay>) {
      this.open = false;
      this.name = init?.name;
      this.recipes = init?.recipes;
      return this;
  }
}