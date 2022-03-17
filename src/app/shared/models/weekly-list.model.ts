import { InternalRecipe, Recipe } from './recipe.model';


export class RecipeDay {
   name: string;
   recipes: InternalRecipe[];
}

export interface InternalRecipeDay extends RecipeDay {
   open: boolean;
   name: string;
   recipes: InternalRecipe[];
}