import { Injectable } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {

  groceryList = new Map<string, Ingredient>();
  constructor() { }

  addToList(ing: Ingredient) {

    let inputIngredient = new Ingredient(ing);
    let ingredientFound = this.groceryList.has(inputIngredient.name);
    let ingredient: Ingredient;
    // Check if the ingredient is not in the map yet
    if (!ingredientFound) {
      this.groceryList.set(inputIngredient.name, inputIngredient);
    }
    else {
      ingredient = this.groceryList.get(inputIngredient.name);
      // If the ingredient has been added, combine the qty if the units are the same
      if (ingredient.unit == inputIngredient.unit) {
        ingredient.qty = String(Number(ingredient.qty) +  Number(inputIngredient.qty));
      }
    }
  }
}
