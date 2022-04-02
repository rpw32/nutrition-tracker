import { Component } from '@angular/core';
import { GroceriesService } from '../services/grocery/groceries.service';
import { Ingredient } from '../shared/models/ingredient.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  groceryList: Map<string, Ingredient>;

  constructor(groceries: GroceriesService) {
    this.groceryList = groceries.groceryList;

    console.log(this.groceryList);
  }

  removeItem(i)
  {
    console.log(`Removing item! ${i}`);
    let removeName = Array.from(this.groceryList.keys())[i];
    this.groceryList.delete(removeName);
  }

}
