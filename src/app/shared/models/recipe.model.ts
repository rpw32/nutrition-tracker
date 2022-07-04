import { empty } from 'rxjs';
import { Ingredient } from './ingredient.model';

export class Recipe {
   _id: string;
   name: string;
   information: string;
   ingredients: Ingredient[] = [];

   public constructor(init?: Partial<Recipe>) {
      if (init) { Object.assign(this, init)
      } else {
         this._id = "0";
         this.name = "";
         this.information = "";
         this.ingredients = new Array<Ingredient>(1);
      }
      this.ingredients = init?.ingredients.map(ingredient => new Ingredient(ingredient) ?? new Ingredient());
      return this;
  }
}

export class InternalRecipe {
   meal: string;
   recipe: Recipe;

   public constructor(meal: string, init?: Partial<Recipe>) {
      if (init) { Object.assign(this, init)
      } else {
         this.recipe = new Recipe();
      }
      this.meal = meal;
      return this;
  }
}
