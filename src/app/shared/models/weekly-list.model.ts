import { InternalRecipe, Recipe } from './recipe.model';

export class RecipeDay {
   name: string;
   recipes: InternalRecipe[] = [];

   public constructor(name: string) {
      this.name = name;
      this.recipes = Array(3);
   }
}

export class InternalRecipeDay implements RecipeDay {
   open: boolean;
   name: string;
   recipes: InternalRecipe[] = [];

   public constructor(init?: Partial<RecipeDay>) {
      this.open = false;
      this.name = init.name;
      this.recipes = init.recipes;
      return this;
  }
}