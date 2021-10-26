import { Recipe } from './recipe.model';

export interface Day {
   name: string;
   children: Recipe[];
}

export interface RootObject {
   items: Day[];
}
