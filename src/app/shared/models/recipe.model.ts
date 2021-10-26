import { Ingredient } from './ingredient.model';

export interface Recipe {
   name: string;
   information: string;
   ingredients: Ingredient[];
}
