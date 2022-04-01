import { InternalRecipe } from './recipe.model';


export interface RecipeDay {
   name: string;
   recipes: InternalRecipe[];
}

export class InternalRecipeDay implements RecipeDay {
   open: boolean;
   name: string;
   recipes: InternalRecipe[];

   public constructor(init?: Partial<RecipeDay>) {
      this.open = false;
      this.name = init.name;
      this.recipes = init.recipes;
      return this;
  }
}

export class WeeklySchedule {
   _id: string;
   days: RecipeDay[];
}
