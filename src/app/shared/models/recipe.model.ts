import { Ingredient } from './ingredient.model';

export interface Recipe {
   id: any;
   name: string;
   information: string;
   ingredients: Ingredient[];
}
