import { Ingredient } from './ingredient.model';

function getMealString(mealInd: number)
{
   switch(mealInd)
   {
      case 0:
         return "Breakfast";
      case 1:
         return "Lunch";
      case 2:
         return "Dinner"
   }
}

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

   public constructor(meal: string, init?: Partial<Recipe>) {
      Object.assign(this, init);
      this.meal = meal;
      return this;
  }
}

export class RecipeScheduleUpdate {
   dayString: string;
   recipe: InternalRecipe;

   public constructor(mealInd: number, dayString: string, init?: Partial<Recipe>) {
      this.recipe = new InternalRecipe(getMealString(mealInd), init)
      this.dayString = dayString;
      return this;
  }
}