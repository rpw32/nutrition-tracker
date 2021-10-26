import { Ingredient } from './ingredient.model';

export interface Child {
   name: string;
   information: string;
   ingredients: Ingredient[];
}

export interface Item {
   name: string;
   children: Child[];
}

export interface RootObject {
   items: Item[];
}
