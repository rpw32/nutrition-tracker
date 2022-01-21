import { Ingredient } from './ingredient.model';

export class Recipe {
   _id: string;
   name: string;
   information: string;
   ingredients: Ingredient[];

   public constructor(init?: Partial<Recipe>) {
      Object.assign(this, init);
      this.ingredients = init.ingredients.map(ingredient => new Ingredient(ingredient));
      return this;
  }
}

export class InternalRecipe {
   meal: string;
   recipe: Recipe;
}