import { Recipe } from './recipe.model';


export interface RecipeDay {
   name: string;
   recipes: Recipe[];
}

export interface InternalRecipeDay extends RecipeDay {
   open: boolean;
   name: string;
   recipes: Recipe[];
}